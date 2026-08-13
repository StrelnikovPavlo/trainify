import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TrainingPlanRepository {
	constructor(private readonly prismaServices: PrismaService) {}

	// TODO:
	// findExercises()
	// create(userId, plan)
	// findByUserId(userId);
}
