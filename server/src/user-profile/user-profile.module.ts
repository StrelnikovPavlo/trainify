import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { UserProfileController } from './user-profile.controller'
import { UserProfileRepository } from './user-profile.repository'
import { UserProfileService } from './user-profile.service'

@Module({
	controllers: [UserProfileController],
	providers: [UserProfileService, PrismaService, UserProfileRepository]
})
export class UserProfileModule {}
