import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'
import { MuscleGroupRepository } from './muscle-group.repository'

@Injectable()
export class MuscleGroupService {
	private readonly logger = new Logger(MuscleGroupService.name)

	constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}

	async findMany() {
		return await this.muscleGroupRepository.findMany()
	}

	async findById(id: string) {
		const group = await this.muscleGroupRepository.findById(id)

		if (!group) throw new NotFoundException('Muscle group not found')

		return group
	}

	async create(dto: CreateMuscleGroupDto) {
		try {
			const group = await this.muscleGroupRepository.create(dto)
			this.logger.log(`Muscle group created: ${group.id}`)
			return group
		} catch (error) {
			this.logger.error(`Failed to create muscle group: ${dto.name}`, error)
			throw error
		}
	}

	async update(id: string, dto: UpdateMuscleGroupDto) {
		await this.findById(id)
		try {
			const group = await this.muscleGroupRepository.update(id, dto)
			this.logger.log(`Muscle group updated: ${group.id}`)
			return group
		} catch (error) {
			this.logger.error(`Failed to update muscle group: ${id}`, error)
			throw error
		}
	}

	async delete(id: string) {
		await this.findById(id)
		await this.muscleGroupRepository.delete(id)
		this.logger.log(`Muscle group deleted: ${id}`)
	}
}
