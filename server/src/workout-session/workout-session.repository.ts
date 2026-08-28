import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ICreateWorkoutSessionDto } from './dto/CreateWorkoutLogDto'

@Injectable()
export class WorkoutSessionRepository {
	constructor(private readonly prismaService: PrismaService) {}

	create(userId: string, data: ICreateWorkoutSessionDto) {
		return this.prismaService.workoutSession.create({
			data: {
				userId,
				trainingDayId: data.trainingDayId
			},
			include: {
				logs: true
			}
		})
	}

	findByTrainingDay(userId: string, trainingDayId: string) {
		return this.prismaService.workoutSession.findFirst({
			where: {
				userId,
				trainingDayId
			},
			include: {
				logs: true
			},
			orderBy: {
				startedAt: 'desc'
			}
		})
	}

	findById(sessionId: string) {
		return this.prismaService.workoutSession.findUnique({
			where: { id: sessionId }
		})
	}

	completeSession(sessionId: string, trainingDayId: string) {
		return this.prismaService.$transaction([
			this.prismaService.workoutSession.update({
				where: { id: sessionId },
				data: { completedAt: new Date() }
			}),
			this.prismaService.trainingDay.update({
				where: { id: trainingDayId },
				data: { status: 'COMPLETED' }
			})
		])
	}
}
