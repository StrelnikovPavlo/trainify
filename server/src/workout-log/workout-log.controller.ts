import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto'
import { WorkoutLogService } from './workout-log.service'

@Controller('workout-log')
export class WorkoutLogController {
	constructor(private readonly workoutLogService: WorkoutLogService) {}

	@Post()
	create(@CurrentUser('id') userId: string, @Body() dto: CreateWorkoutLogDto) {
		return this.workoutLogService.create(userId, dto)
	}
}
