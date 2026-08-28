import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { WorkoutSessionController } from './workout-session.controller'
import { WorkoutSessionRepository } from './workout-session.repository'
import { WorkoutSessionService } from './workout-session.service'

@Module({
	controllers: [WorkoutSessionController],
	providers: [WorkoutSessionService, PrismaService, WorkoutSessionRepository]
})
export class WorkoutSessionModule {}
