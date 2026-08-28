import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Post } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto'
import { WorkoutLogService } from './workout-log.service'

@ApiBearerAuth()
@ApiTags('workout-log')
@Controller(ROUTES.workoutLog.base)
export class WorkoutLogController {
	constructor(private readonly workoutLogService: WorkoutLogService) {}

	@ApiOperation({
		summary: 'Log a completed exercise'
	})
	@ApiCreatedResponse({ description: 'Workout log successfully created' })
	@ApiNotFoundResponse({ description: 'Session or exercise not found' })
	@Post()
	create(@CurrentUser('id') userId: string, @Body() dto: CreateWorkoutLogDto) {
		return this.workoutLogService.create(userId, dto)
	}
}
