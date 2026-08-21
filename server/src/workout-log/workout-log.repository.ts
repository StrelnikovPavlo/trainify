import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated/prisma/client'

@Injectable()
export class WorkoutLogRepository {
	constructor(private readonly prismaService: PrismaService) {}

	create(data: Prisma.WorkoutLogUncheckedCreateInput) {
		return this.prismaService.workoutLog.create({ data })
	}

	findSessionWithUser(sessionId: string) {
		return this.prismaService.workoutSession.findUnique({
			where: { id: sessionId },
			select: { id: true, userId: true, completedAt: true }
		})
	}
}
