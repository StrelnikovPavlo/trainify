import { Controller } from '@nestjs/common'
import { TrainingPlanService } from './training-plan.service'

@Controller('training-plan')
export class TrainingPlanController {
	constructor(private readonly trainingPlanService: TrainingPlanService) {}

	// TODO:
	// POST /training-plan/generate
	// GET /training-plan/me;
}
