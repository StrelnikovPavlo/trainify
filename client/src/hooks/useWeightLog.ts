import { weightLogService } from '@/services/weight-log.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useWeightLog() {
	const queryClient = useQueryClient()

	const { data: latest, isLoading } = useQuery({
		queryKey: ['weight-log', 'latest'],
		queryFn: () => weightLogService.getLatest(),
	})

	const logMutation = useMutation({
		mutationFn: (weight: number) => weightLogService.log(weight),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['weight-log'] })
		},
	})

	return {
		latest,
		isLoading,
		logWeight: logMutation.mutateAsync,
		isLogging: logMutation.isPending,
	}
}
