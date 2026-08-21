import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ICreateWorkoutSessionDto } from './dto/CreateWorkoutLogDto'
import { WorkoutSessionService } from './workout-session.service'

@ApiBearerAuth()
@ApiTags('workout-session')
@Controller('workout-session')
export class WorkoutSessionController {
	constructor(private readonly workoutSessionService: WorkoutSessionService) {}

	@Post()
	create(
		@CurrentUser('id') userId: string,
		@Body() dto: ICreateWorkoutSessionDto
	) {
		return this.workoutSessionService.create(userId, dto)
	}

	@Get('/:trainingDayId')
	findByTrainingDay(
		@CurrentUser('id') userId: string,
		@Param('trainingDayId') trainingDayId: string
	) {
		return this.workoutSessionService.findByTrainingDay(userId, trainingDayId)
	}

	@Put(':id')
	complete(@CurrentUser('id') userId: string, @Param('id') sessionId: string) {
		return this.workoutSessionService.complete(userId, sessionId)
	}
}
