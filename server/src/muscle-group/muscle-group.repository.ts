import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { MuscleGroup, Prisma } from 'prisma/generated/prisma/client'

@Injectable()
export class MuscleGroupRepository {
	constructor(private readonly prismaServices: PrismaService) {}

	findMany(): Promise<MuscleGroup[]> {
		return this.prismaServices.muscleGroup.findMany({})
	}

	findById(id: string): Promise<MuscleGroup | null> {
		return this.prismaServices.muscleGroup.findUnique({
			where: { id }
		})
	}

	create(data: Prisma.MuscleGroupCreateInput): Promise<MuscleGroup> {
		return this.prismaServices.muscleGroup.create({ data })
	}

	update(
		id: string,
		data: Prisma.MuscleGroupUpdateInput
	): Promise<MuscleGroup> {
		return this.prismaServices.muscleGroup.update({
			where: { id },
			data
		})
	}

	delete(id: string): Promise<MuscleGroup> {
		return this.prismaServices.muscleGroup.delete({
			where: { id }
		})
	}
}
