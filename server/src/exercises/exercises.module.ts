import { EquipmentRepository } from '@/equipment/equipment.repository'
import { EquipmentService } from '@/equipment/equipment.service'
import { MuscleGroupRepository } from '@/muscle-group/muscle-group.repository'
import { MuscleGroupService } from '@/muscle-group/muscle-group.service'
import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { ExercisesController } from './exercises.controller'
import { ExercisesRepository } from './exercises.repository'
import { ExercisesService } from './exercises.service'

@Module({
	controllers: [ExercisesController],
	providers: [
		ExercisesService,
		PrismaService,
		ExercisesRepository,
		MuscleGroupService,
		EquipmentService,
		MuscleGroupRepository,
		EquipmentRepository
	]
})
export class ExercisesModule {}
