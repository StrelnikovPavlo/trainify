import { PrismaService } from '@/prisma/prisma.service'
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { hash } from 'argon2'
import { User } from 'prisma/generated/prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const { email, password } = createUserDto

		await this.validateUser(email)

		const hashPassword = await hash(password)

		const user = await this.prismaService.user.create({
			data: {
				...createUserDto,
				password: hashPassword
			}
		})

		return user
	}

	findAll() {
		return this.prismaService.user.findMany()
	}

	async findOne(id: string): Promise<User> {
		const user = await this.prismaService.user.findUnique({
			where: { id }
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		return await this.prismaService.user.update({
			where: { id },
			data: updateUserDto
		})
	}

	async remove(id: string): Promise<User> {
		return await this.prismaService.user.delete({
			where: { id }
		})
	}

	private async validateUser(email: string): Promise<void> {
		const user = await this.prismaService.user.findUnique({
			where: { email }
		})

		if (user) {
			throw new ConflictException('User already exist')
		}
	}
}
