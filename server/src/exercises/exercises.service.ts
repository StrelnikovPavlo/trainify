import { Injectable, NotFoundException } from '@nestjs/common'
import { Exercise } from 'prisma/generated/prisma/client'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { ExercisesRepository } from './exercises.repository'

@Injectable()
export class ExercisesService {
	constructor(private readonly exercisesRepository: ExercisesRepository) {}

	findMany(): Promise<Exercise[]> {
		return this.exercisesRepository.findMany()
	}

	async findById(id: string): Promise<Exercise> {
		const exercise = await this.exercisesRepository.findById(id)

		if (!exercise) {
			throw new NotFoundException(`Exercise with id ${id} not found`)
		}

		return exercise
	}

	create(dto: CreateExerciseDto): Promise<Exercise> {
		const { muscleGroupId, equipmentId, ...rest } = dto

		return this.exercisesRepository.create({
			...rest,
			muscleGroup: { connect: { id: muscleGroupId } },
			equipment: { connect: { id: equipmentId } }
		})
	}

	async update(id: string, dto: UpdateExerciseDto): Promise<Exercise> {
		await this.findById(id)

		const { muscleGroupId, equipmentId, ...rest } = dto

		return this.exercisesRepository.update(id, {
			...rest,
			...(muscleGroupId && {
				muscleGroup: { connect: { id: muscleGroupId } }
			}),
			...(equipmentId && {
				equipment: { connect: { id: equipmentId } }
			})
		})
	}

	async delete(id: string): Promise<Exercise> {
		await this.findById(id)
		return this.exercisesRepository.delete(id)
	}
}
