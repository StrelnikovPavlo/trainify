import { Injectable, NotFoundException } from '@nestjs/common'
import { Equipment } from 'prisma/generated/prisma/client'
import { CreateEquipmentDto } from './dto/create-equipment.dto'
import { UpdateEquipmentDto } from './dto/update-equipment.dto'
import { EquipmentRepository } from './equipment.repository'

@Injectable()
export class EquipmentService {
	constructor(private readonly equipmentRepository: EquipmentRepository) {}

	findMany(): Promise<Equipment[]> {
		return this.equipmentRepository.findMany()
	}

	async findById(id: string): Promise<Equipment> {
		const equipment = await this.equipmentRepository.findById(id)

		if (!equipment) {
			throw new NotFoundException(`Equipment with id ${id} not found`)
		}

		return equipment
	}

	create(dto: CreateEquipmentDto): Promise<Equipment> {
		return this.equipmentRepository.create(dto)
	}

	async update(id: string, dto: UpdateEquipmentDto): Promise<Equipment> {
		await this.findById(id)
		return this.equipmentRepository.update(id, dto)
	}

	async delete(id: string): Promise<Equipment> {
		await this.findById(id)
		return this.equipmentRepository.delete(id)
	}
}
