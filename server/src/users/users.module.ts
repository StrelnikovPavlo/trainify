import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService, PrismaService, UserRepository]
})
export class UsersModule {}
