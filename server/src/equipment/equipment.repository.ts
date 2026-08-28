import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Equipment, Prisma } from 'prisma/generated/prisma/client'

@Injectable()
export class EquipmentRepository {
	constructor(private readonly prismaService: PrismaService) {}

	findMany(): Promise<Equipment[]> {
		return this.prismaService.equipment.findMany({})
	}

	findById(id: string): Promise<Equipment | null> {
		return this.prismaService.equipment.findUnique({
			where: { id }
		})
	}

	create(data: Prisma.EquipmentCreateInput): Promise<Equipment> {
		return this.prismaService.equipment.create({ data })
	}

	update(id: string, data: Prisma.EquipmentUpdateInput): Promise<Equipment> {
		return this.prismaService.equipment.update({
			where: { id },
			data
		})
	}

	delete(id: string): Promise<Equipment> {
		return this.prismaService.equipment.delete({
			where: { id }
		})
	}
}
