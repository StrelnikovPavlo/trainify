import { EquipmentRepository } from '@/equipment/equipment.repository'
import { EquipmentService } from '@/equipment/equipment.service'
import { ExercisesRepository } from '@/exercises/exercises.repository'
import { ExercisesService } from '@/exercises/exercises.service'
import { MuscleGroupRepository } from '@/muscle-group/muscle-group.repository'
import { MuscleGroupService } from '@/muscle-group/muscle-group.service'
import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { WorkoutLogController } from './workout-log.controller'
import { WorkoutLogRepository } from './workout-log.repository'
import { WorkoutLogService } from './workout-log.service'

@Module({
	controllers: [WorkoutLogController],
	providers: [
		WorkoutLogService,
		PrismaService,
		WorkoutLogRepository,
		ExercisesService,
		ExercisesRepository,
		MuscleGroupRepository,
		MuscleGroupService,
		EquipmentRepository,
		EquipmentService
	]
})
export class WorkoutLogModule {}
