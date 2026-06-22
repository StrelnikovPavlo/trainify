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
	REFRESH_TOKEN_TTL_DAYS = 15

	constructor(
		private readonly userServices: UsersService,
		private readonly prismaServices: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async register(dto: CreateUserDto) {
		const user = await this.userServices.create(dto)
		return this.issueTokens(user.id, user.email, user.role)
	}

	async login(dto: LoginDto) {
		const user = await this.userServices.findByEmailWithPassword(dto.email)
		const isValid = user && (await verify(user.password, dto.password))

		if (!isValid) {
			throw new UnauthorizedException('Invalid credentials')
		}

		return this.issueTokens(user.id, user.email, user.role)
	}

	async logout(rawRefreshToken: string) {
		const hashedToken = this.hashToken(rawRefreshToken)
		await this.prismaServices.refreshToken.deleteMany({
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

	private async storeRefreshToken(userId: string, rawToken: string) {
		const expiresAt = new Date()
		expiresAt.setDate(expiresAt.getDate() + this.REFRESH_TOKEN_TTL_DAYS)

		await this.prismaServices.refreshToken.create({
			data: {
				userId,
				hashedToken: this.hashToken(rawToken),
				expiresAt
			}
		})
	}

	private hashToken(token: string): string {
		return createHash('sha256').update(token).digest('hex')
	}
}
