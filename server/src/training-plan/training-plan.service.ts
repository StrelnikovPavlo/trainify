import { AiService } from '@/ai/ai.service'
import { UserProfileService } from '@/user-profile/user-profile.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { buildTrainingPlanPrompt } from './prompts/training-plan.prompt'
import { TrainingPlanRepository } from './training-plan.repository'
import { GeneratedPlan } from './types/generated-plan.type'

@Injectable()
export class TrainingPlanService {
	private readonly TRAINING_PLAN_DURATION_DAYS = 7
	constructor(
		private readonly trainingPlanRepository: TrainingPlanRepository,
		private readonly aiService: AiService,
		private readonly userProfileService: UserProfileService
	) {}

	async findByUserId(userId: string) {
		const plan = await this.trainingPlanRepository.findByUserId(userId)

		if (!plan) {
			throw new NotFoundException('Training plan not found')
		}

		return plan
	}

	async delete(userId: string) {
		const deleted = await this.trainingPlanRepository.delete(userId)

		if (!deleted) {
			throw new NotFoundException('Training plan not found')
		}

		return deleted
	}

	async generate(userId: string) {
		const userProfile = await this.userProfileService.findByUserId(userId)
		const exercises = await this.trainingPlanRepository.findExercises()
		const prompt = buildTrainingPlanPrompt(
			userProfile,
			exercises,
			this.TRAINING_PLAN_DURATION_DAYS
		)

		const response = await this.aiService.generate(prompt)
		const parsed = JSON.parse(response) as GeneratedPlan

		const startDate = new Date()
		parsed.startDate = startDate.toISOString().split('T')[0]

		parsed.days = parsed.days.map((day, index) => {
			const date = new Date(startDate)
			date.setDate(date.getDate() + index)
			return {
				...day,
				date: date.toISOString().split('T')[0]
			}
		})

		return this.trainingPlanRepository.create(userId, parsed)
	}
}
