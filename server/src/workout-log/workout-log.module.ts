import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { WorkoutLogController } from './workout-log.controller'
import { WorkoutLogRepository } from './workout-log.repository'
import { WorkoutLogService } from './workout-log.service'

@Module({
	controllers: [WorkoutLogController],
	providers: [WorkoutLogService, PrismaService, WorkoutLogRepository]
})
export class WorkoutLogModule {}
