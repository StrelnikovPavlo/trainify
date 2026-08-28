import { EquipmentService } from '@/equipment/equipment.service'
import { MuscleGroupService } from '@/muscle-group/muscle-group.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Exercise } from 'prisma/generated/prisma/client'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { ExercisesRepository } from './exercises.repository'

@Injectable()
export class ExercisesService {
	constructor(
		private readonly exercisesRepository: ExercisesRepository,
		private readonly muscleGroupService: MuscleGroupService,
		private readonly equipmentService: EquipmentService
	) {}

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

	async create(dto: CreateExerciseDto): Promise<Exercise> {
		const { muscleGroupId, equipmentId, ...rest } = dto

		const muscleGroup = await this.muscleGroupService.findById(muscleGroupId)
		if (!muscleGroup) {
			throw new NotFoundException(
				`Muscle group with id "${muscleGroupId}" not found`
			)
		}

		const equipment = await this.equipmentService.findById(equipmentId)
		if (!equipment) {
			throw new NotFoundException(
				`Equipment with id "${equipmentId}" not found`
			)
		}

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
