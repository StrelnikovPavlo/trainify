import { PrismaService } from '@/prisma/prisma.service'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { UsersService } from '@/users/users.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import { createHash, randomBytes } from 'crypto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 15

	constructor(
		private readonly userService: UsersService,
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async register(dto: CreateUserDto) {
		const user = await this.userService.create(dto)
		return this.issueTokens(user.id, user.email, user.role)
	}

	async login(dto: LoginDto) {
		const user = await this.userService.findByEmailWithPassword(dto.email)
		const isValid = user && (await verify(user.password, dto.password))

		if (!isValid) {
			throw new UnauthorizedException('Invalid credentials')
		}

		return this.issueTokens(user.id, user.email, user.role)
	}

	async logout(rawRefreshToken: string) {
		const hashedToken = this.hashToken(rawRefreshToken)
		await this.prismaService.refreshToken.deleteMany({
			where: { hashedToken }
		})
	}

	private async issueTokens(userId: string, email: string, role: string) {
		const accessToken = this.jwtService.sign(
			{ id: userId, email, role },
			{
				secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
				expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN')
			}
		)

		const refreshToken = randomBytes(64).toString('hex')
		await this.storeRefreshToken(userId, refreshToken)

		return { accessToken, refreshToken }
	}

	private async storeRefreshToken(userId: string, token: string) {
		const expiresAt = new Date()
		expiresAt.setDate(expiresAt.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		await this.prismaService.refreshToken.create({
			data: {
				userId,
				hashedToken: this.hashToken(token),
				expiresAt
			}
		})
	}

	private hashToken(token: string): string {
		return createHash('sha256').update(token).digest('hex')
	}

	async refreshTokens(rawRefreshToken: string) {
		const hashedToken = this.hashToken(rawRefreshToken)

		const stored = await this.prismaService.refreshToken.findUnique({
			where: { hashedToken }
		})

		if (!stored || stored.expiresAt < new Date()) {
			throw new UnauthorizedException('Invalid or expired refresh token')
		}

		await this.prismaService.refreshToken.delete({
			where: { id: stored.id }
		})

		const user = await this.userService.findById(stored.userId)

		return this.issueTokens(user.id, user.email, user.role)
	}
}
