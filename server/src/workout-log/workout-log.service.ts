import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto'
import { WorkoutLogRepository } from './workout-log.repository'

@Injectable()
export class WorkoutLogService {
	constructor(private readonly workoutLogRepository: WorkoutLogRepository) {}

	async create(userId: string, dto: CreateWorkoutLogDto) {
		const session = await this.workoutLogRepository.findSessionWithUser(
			dto.sessionId
		)

		if (!session) {
			throw new NotFoundException('Workout session not found')
		}

		if (session.userId !== userId) {
			throw new ForbiddenException('Access denied to this workout session')
		}

		if (session.completedAt) {
			throw new BadRequestException(
				'Cannot add log to a completed workout session'
			)
		}

		return this.workoutLogRepository.create(dto)
	}
}
