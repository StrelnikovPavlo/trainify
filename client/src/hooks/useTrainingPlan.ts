import { trainingPlanService } from '@/services/training-plan.service'
import { useQuery } from '@tanstack/react-query'

export function useTrainingPlan() {
	return useQuery({
		queryKey: ['training-plan'],
		queryFn: () => trainingPlanService.getPlan(),
	})
}
