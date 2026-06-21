import { Injectable, Logger } from '@nestjs/common'
import { hash } from 'argon2'
import { Prisma } from 'prisma/generated/prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exceptions'
import { UserNotFoundExceptions } from './exceptions/user-not-fount.exceptions'
import { UserRepository } from './user.repository'

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name)

	constructor(private readonly usersRepository: UserRepository) {}

	async create(dto: CreateUserDto) {
		await this.ensureEmailIsFree(dto.email)

		const password = await hash(dto.password)

		try {
			const user = await this.usersRepository.create({
				...dto,
				password
			})

			this.logger.log(`Created user ${user.id}`)

			return user
		} catch (error) {
			throw this.handleKnownErrors(error, dto.email)
		}
	}

	async findMany() {
		const [users, count] = await Promise.all([
			this.usersRepository.count(),
			this.usersRepository.findMany()
		])
		return { users, count }
	}

	async findById(id: string) {
		const user = await this.usersRepository.findById(id)

		if (!user) throw new UserNotFoundExceptions(id)

		return user
	}

	async findByEmailWithPassword(email: string) {
		return this.usersRepository.findByEmail(email)
	}

	async update(id: string, dto: UpdateUserDto) {
		await this.findById(id)

		try {
			const user = await this.usersRepository.update(id, dto)
			this.logger.log(`Updated user ${user.id}`)
			return user
		} catch (error) {
			throw this.handleKnownErrors(error, dto.email)
		}
	}

	async delete(id: string): Promise<void> {
		await this.findById(id)
		await this.usersRepository.delete(id)
		this.logger.log(`Removed user ${id}`)
	}

	private async ensureEmailIsFree(email: string): Promise<void> {
		const existing = await this.usersRepository.findByEmail(email)

		if (existing) {
			throw new UserAlreadyExistsException(email)
		}
	}

	private handleKnownErrors(error: unknown, email?: string): Error {
		const isUniqueViolation =
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'

		if (isUniqueViolation) {
			return new UserAlreadyExistsException(email ?? 'unknown')
		}

		return error as Error
	}
}
