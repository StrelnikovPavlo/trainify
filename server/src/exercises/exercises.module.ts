import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { ExercisesController } from './exercises.controller'
import { ExercisesRepository } from './exercises.repository'
import { ExercisesService } from './exercises.service'

@Module({
	controllers: [ExercisesController],
	providers: [ExercisesService, PrismaService, ExercisesRepository]
})
export class ExercisesModule {}
