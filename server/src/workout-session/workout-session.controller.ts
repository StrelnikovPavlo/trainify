import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam
} from '@nestjs/swagger'
import { ICreateWorkoutSessionDto } from './dto/CreateWorkoutLogDto'
import { WorkoutSessionService } from './workout-session.service'

@ApiBearerAuth()
@Controller(ROUTES.workoutSession.base)
export class WorkoutSessionController {
	constructor(private readonly workoutSessionService: WorkoutSessionService) {}

	@ApiCreatedResponse({ description: 'Workout session successfully created' })
	@Post()
	create(
		@CurrentUser('id') userId: string,
		@Body() dto: ICreateWorkoutSessionDto
	) {
		return this.workoutSessionService.create(userId, dto)
	}

	@ApiOperation({
		summary: 'Get workout session by training day'
	})
	@ApiParam({
		name: 'trainingDayId',
		description: 'Training day ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Workout session found and returned' })
	@ApiNotFoundResponse({
		description: 'No workout session found for this training day'
	})
	@Get(ROUTES.workoutSession.trainingId)
	findByTrainingDay(
		@CurrentUser('id') userId: string,
		@Param('trainingDayId') trainingDayId: string
	) {
		return this.workoutSessionService.findByTrainingDay(userId, trainingDayId)
	}

	@ApiOperation({
		summary: 'Complete a workout session'
	})
	@ApiParam({
		name: 'id',
		description: 'Workout session ID',
		example: 'cku1122334455'
	})
	@ApiOkResponse({ description: 'Workout session successfully completed' })
	@ApiNotFoundResponse({ description: 'Workout session not found' })
	@Put(ROUTES.workoutSession.byId)
	complete(@CurrentUser('id') userId: string, @Param('id') sessionId: string) {
		return this.workoutSessionService.complete(userId, sessionId)
	}
}
