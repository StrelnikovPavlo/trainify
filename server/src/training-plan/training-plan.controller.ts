import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { ROUTES } from '@/constants/routes.constant'
import { Controller, Get, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { TrainingPlanService } from './training-plan.service'

@ApiBearerAuth()
@ApiTags('training-plan')
@Controller(ROUTES.trainingPlan.base)
export class TrainingPlanController {
	constructor(private readonly trainingPlanService: TrainingPlanService) {}

	@ApiOperation({
		summary: 'Generate a personalized training plan for the current user'
	})
	@Post(ROUTES.trainingPlan.generate)
	generate(@CurrentUser('id') userId: string) {
		return this.trainingPlanService.generate(userId)
	}

	@ApiOperation({
		summary: 'Get the current active training plan for the current user'
	})
	@Get(ROUTES.trainingPlan.me)
	findMyPlan(@CurrentUser('id') userId: string) {
		return this.trainingPlanService.findByUserId(userId)
	}
}
