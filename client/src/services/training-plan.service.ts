import { axiosInstance } from '@/lib/axios'
import { IGeneratedPlan } from '@/types/training-plan.types'

class TrainingPlanService {
	private BASE_URL = '/training-plan'

	async generate(): Promise<IGeneratedPlan> {
		const { data } = await axiosInstance.post<IGeneratedPlan>(
			`${this.BASE_URL}/generate`,
		)
		return data
	}

	async getPlan(): Promise<IGeneratedPlan> {
		const { data } = await axiosInstance.get<IGeneratedPlan>(
			`${this.BASE_URL}/me`,
		)
		return data
	}
}

export const trainingPlanService = new TrainingPlanService()
