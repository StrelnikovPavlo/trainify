import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Exercise, Prisma } from 'prisma/generated/prisma/client'

@Injectable()
export class ExercisesRepository {
	constructor(private readonly prismaServices: PrismaService) {}

	findMany(): Promise<Exercise[]> {
		return this.prismaServices.exercise.findMany({
			include: { muscleGroup: true, equipment: true }
		})
	}

	findById(id: string): Promise<Exercise | null> {
		return this.prismaServices.exercise.findUnique({
			where: { id },
			include: { muscleGroup: true, equipment: true }
		})
	}

	create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
		return this.prismaServices.exercise.create({ data })
	}

	update(id: string, data: Prisma.ExerciseUpdateInput): Promise<Exercise> {
		return this.prismaServices.exercise.update({
			where: { id },
			data
		})
	}

	delete(id: string): Promise<Exercise> {
		return this.prismaServices.exercise.delete({
			where: { id }
		})
	}
}
