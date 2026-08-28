import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { ROUTES } from '@/constants/routes.constant'
import { Controller, Delete, Get, Post } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { TrainingPlanService } from './training-plan.service'

@ApiBearerAuth()
@ApiTags('training-plan')
@Controller(ROUTES.trainingPlan.base)
export class TrainingPlanController {
	constructor(private readonly trainingPlanService: TrainingPlanService) {}

	@ApiOperation({
		summary: 'Generate a personalized training plan for the current user'
	})
	@ApiCreatedResponse({ description: 'Training plan generated successfully' })
	@Post(ROUTES.trainingPlan.generate)
	generate(@CurrentUser('id') userId: string) {
		return this.trainingPlanService.generate(userId)
	}

	@ApiOperation({
		summary: 'Delete training plan for the current user'
	})
	@ApiOkResponse({ description: 'Training plan deleted successfully' })
	@ApiNotFoundResponse({ description: 'No training plan found for this user' })
	@Delete()
	delete(@CurrentUser('id') userId: string) {
		return this.trainingPlanService.delete(userId)
	}

	@ApiOperation({
		summary: 'Get the current active training plan for the current user'
	})
	@ApiOkResponse({ description: 'Training plan returned successfully' })
	@ApiNotFoundResponse({ description: 'No training plan found for this user' })
	@Get(ROUTES.trainingPlan.me)
	findMyPlan(@CurrentUser('id') userId: string) {
		return this.trainingPlanService.findByUserId(userId)
	}
}
