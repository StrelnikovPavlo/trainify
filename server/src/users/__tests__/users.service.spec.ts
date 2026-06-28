import { Test } from '@nestjs/testing'
import * as argon2 from 'argon2'
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exceptions'
import { UserNotFoundExceptions } from '../exceptions/user-not-fount.exceptions'
import { UserRepository } from '../user.repository'
import { UsersService } from '../users.service'

jest.mock('argon2', () => ({
	hash: jest.fn().mockResolvedValue('hashed_password')
}))

const mockUsersRepository = {
	findById: jest.fn(),
	findByEmail: jest.fn(),
	findMany: jest.fn(),
	count: jest.fn(),
	create: jest.fn(),
	update: jest.fn(),
	delete: jest.fn()
}

describe('Users Services', () => {
	let service: UsersService

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: UserRepository,
					useValue: mockUsersRepository
				}
			]
		}).compile()

		service = module.get(UsersService)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('findById', () => {
		it('Return the user if it exist', async () => {
			const fakeUser = { id: '123', email: 'test@test.com', role: 'USER' }

			mockUsersRepository.findById.mockResolvedValue(fakeUser)

			const result = await service.findById('123')

			expect(result).toEqual(fakeUser)

			expect(mockUsersRepository.findById).toHaveBeenCalledWith('123')
		})

		it('Throws UserNotFoundException if user not found', async () => {
			mockUsersRepository.findById.mockResolvedValue(null)

			await expect(service.findById('999')).rejects.toThrow(
				UserNotFoundExceptions
			)
		})
	})

	describe('Create user', () => {
		it('Creating user', async () => {
			const user = {
				username: 'Pavlo',
				surname: 'Strelnykov',
				email: 'fd@fe.com',
				password: 'hashed_password'
			}

			mockUsersRepository.findByEmail.mockResolvedValue(null)
			mockUsersRepository.create.mockResolvedValue(user)

			const result = await service.create(user)

			expect(result).toEqual(user)

			expect(mockUsersRepository.create).toHaveBeenCalledWith(user)
		})

		it('Hashes password before saving', async () => {
			const dto = {
				username: 'Pavlo',
				surname: 'Strelnykov',
				email: 'fd@fe.com',
				password: '123456'
			}

			mockUsersRepository.findByEmail.mockResolvedValue(null)
			mockUsersRepository.create.mockResolvedValue({
				...dto,
				password: 'hashed_password'
			})

			await service.create(dto)

			expect(argon2.hash).toHaveBeenCalledWith('123456')
		})

		it('Throws UserAlreadyExistsException if user already exists', async () => {
			const user = {
				username: 'Pavlo',
				surname: 'Strelnykov',
				email: 'fd@fe.com',
				password: 'hashed_password'
			}

			mockUsersRepository.findByEmail.mockResolvedValue(user)

			await expect(service.create(user)).rejects.toThrow(
				UserAlreadyExistsException
			)

			expect(mockUsersRepository.create).not.toHaveBeenCalled()
		})
	})

	describe('findMany', () => {
		it('Returns users list', async () => {
			const users = [
				{ id: '1', email: '1@test.com' },
				{ id: '2', email: '2@test.com' }
			]

			mockUsersRepository.count.mockResolvedValue(2)
			mockUsersRepository.findMany.mockResolvedValue(users)

			const result = await service.findMany()

			expect(result).toEqual({
				users,
				count: 2
			})

			expect(mockUsersRepository.count).toHaveBeenCalled()
			expect(mockUsersRepository.findMany).toHaveBeenCalled()
		})
	})

	describe('update', () => {
		it('Updates user', async () => {
			const user = {
				id: '1',
				username: 'Pavlo'
			}

			mockUsersRepository.findById.mockResolvedValue(user)

			mockUsersRepository.update.mockResolvedValue({
				...user,
				username: 'Ivan'
			})

			const result = await service.update('1', {
				username: 'Ivan'
			})

			expect(result.username).toBe('Ivan')

			expect(mockUsersRepository.update).toHaveBeenCalled()
		})

		it('Throws UserNotFoundException', async () => {
			mockUsersRepository.findById.mockResolvedValue(null)

			await expect(service.update('1', {})).rejects.toThrow(
				UserNotFoundExceptions
			)
		})
	})

	describe('remove', () => {
		it('Deletes user', async () => {
			const user = {
				id: '1'
			}

			mockUsersRepository.findById.mockResolvedValue(user.id)

			mockUsersRepository.delete.mockResolvedValue(undefined)

			await service.delete('1')

			expect(mockUsersRepository.delete).toHaveBeenCalledWith('1')
		})

		it('Throws UserNotFoundException', async () => {
			mockUsersRepository.findById.mockResolvedValue(null)

			await expect(service.delete('1')).rejects.toThrow(UserNotFoundExceptions)
		})
	})
})
