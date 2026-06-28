import { PrismaService } from '@/prisma/prisma.service'
import { UsersService } from '@/users/users.service'
import { UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import * as argon2 from 'argon2'
import { AuthService } from '../auth.service'

const mockUsersService = {
	create: jest.fn(),
	findByEmailWithPassword: jest.fn(),
	findById: jest.fn()
}

const mockPrismaService = {
	refreshToken: {
		create: jest.fn(),
		delete: jest.fn(),
		deleteMany: jest.fn(),
		findUnique: jest.fn()
	}
}

const mockJwtService = {
	sign: jest.fn().mockReturnValue('access_token')
}

const mockConfigService = {
	getOrThrow: jest.fn((key: string) => {
		switch (key) {
			case 'JWT_ACCESS_SECRET':
				return 'secret'
			case 'JWT_ACCESS_EXPIRES_IN':
				return '15m'
		}
	})
}

jest.mock('argon2', () => ({
	verify: jest.fn()
}))

describe('Auth Service', () => {
	let service: AuthService

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: mockUsersService
				},
				{
					provide: PrismaService,
					useValue: mockPrismaService
				},
				{
					provide: JwtService,
					useValue: mockJwtService
				},
				{
					provide: ConfigService,
					useValue: mockConfigService
				}
			]
		}).compile()

		service = module.get(AuthService)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('Registers user', async () => {
		const user = {
			id: '1',
			username: 'Pavlo',
			surname: 'Str',
			password: '123',
			email: 'test@test.com',
			role: 'USER'
		}

		mockUsersService.create.mockResolvedValue(user)

		const result = await service.register(user)

		expect(mockUsersService.create).toHaveBeenCalled()
		expect(result.accessToken).toBeDefined()
		expect(result.refreshToken).toBeDefined()
	})

	it('Login user', async () => {
		const user = {
			id: '1',
			email: 'test@test.com',
			role: 'USER',
			password: 'hashed'
		}

		mockUsersService.findByEmailWithPassword.mockResolvedValue(user)
		;(argon2.verify as jest.Mock).mockResolvedValue(true)

		const result = await service.login({
			email: user.email,
			password: '123456'
		})

		expect(result.accessToken).toBeDefined()
	})

	it('Throws UnauthorizedException', async () => {
		const user = {
			password: 'hashed'
		}

		mockUsersService.findByEmailWithPassword.mockResolvedValue(user)
		;(argon2.verify as jest.Mock).mockResolvedValue(false)

		await expect(
			service.login({
				email: 'test@test.com',
				password: '123'
			})
		).rejects.toThrow(UnauthorizedException)
	})

	it('Logout user', async () => {
		mockPrismaService.refreshToken.deleteMany.mockResolvedValue({})

		await service.logout('refreshToken')

		expect(mockPrismaService.refreshToken.deleteMany).toHaveBeenCalled()
	})

	it('Refresh tokens', async () => {
		mockPrismaService.refreshToken.findUnique.mockResolvedValue({
			id: '1',
			userId: '1',
			expiresAt: new Date(Date.now() + 100000)
		})

		mockPrismaService.refreshToken.delete.mockResolvedValue({})

		mockUsersService.findById.mockResolvedValue({
			id: '1',
			email: 'test@test.com',
			role: 'USER'
		})

		const result = await service.refreshTokens('refresh')

		expect(result.accessToken).toBeDefined()
	})

	it('Throws UnauthorizedException if refresh token expired', async () => {
		mockPrismaService.refreshToken.findUnique.mockResolvedValue({
			expiresAt: new Date(Date.now() - 1000)
		})

		await expect(service.refreshTokens('refresh')).rejects.toThrow(
			UnauthorizedException
		)
	})
})
