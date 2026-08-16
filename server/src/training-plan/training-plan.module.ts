import { AiModule } from '@/ai/ai.module'
import { AiService } from '@/ai/ai.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserProfileRepository } from '@/user-profile/user-profile.repository'
import { UserProfileService } from '@/user-profile/user-profile.service'
import { Module } from '@nestjs/common'
import { TrainingPlanController } from './training-plan.controller'
import { TrainingPlanRepository } from './training-plan.repository'
import { TrainingPlanService } from './training-plan.service'

@Module({
	controllers: [TrainingPlanController],
	providers: [
		TrainingPlanService,
		AiService,
		UserProfileService,
		UserProfileRepository,
		TrainingPlanRepository,
		PrismaService
	],
	imports: [AiModule]
})
export class TrainingPlanModule {}
