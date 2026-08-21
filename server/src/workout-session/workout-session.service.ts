import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ICreateWorkoutSessionDto } from './dto/CreateWorkoutLogDto'
import { WorkoutSessionRepository } from './workout-session.repository'

@Injectable()
export class WorkoutSessionService {
	constructor(
		private readonly workoutSessionRepository: WorkoutSessionRepository
	) {}

	async create(userId: string, dto: ICreateWorkoutSessionDto) {
		const activeSession = await this.workoutSessionRepository.findByTrainingDay(
			userId,
			dto.trainingDayId
		)

		if (activeSession && !activeSession.completedAt) {
			return activeSession
		}

		return this.workoutSessionRepository.create(userId, dto)
	}

	async findByTrainingDay(userId: string, trainingDayId: string) {
		const session = await this.workoutSessionRepository.findByTrainingDay(
			userId,
			trainingDayId
		)
		if (!session) {
			throw new NotFoundException(
				'Workout session for this training day not found'
			)
		}
		return session
	}

	async complete(userId: string, sessionId: string) {
		const session = await this.workoutSessionRepository.findById(sessionId)

		if (!session) {
			throw new NotFoundException('Workout session not found')
		}

		if (session.userId !== userId) {
			throw new ForbiddenException('Access denied to this session')
		}

		if (session.completedAt) {
			throw new BadRequestException('Workout session is already completed')
		}

		const [updatedSession] =
			await this.workoutSessionRepository.completeSession(
				sessionId,
				session.trainingDayId
			)

		return updatedSession
	}
}
