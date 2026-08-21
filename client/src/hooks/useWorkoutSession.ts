// src/hooks/useWorkoutSession.ts
import { CreateWorkoutLogDto, workoutService } from '@/services/workout.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useWorkoutSession(trainingDayId: string) {
	const queryClient = useQueryClient()

	const {
		data: session,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['workout-session', trainingDayId],
		queryFn: () => workoutService.getSessionByTrainingDay(trainingDayId),
		enabled: !!trainingDayId,
	})

	const startSessionMutation = useMutation({
		mutationFn: () => workoutService.startSession(trainingDayId),
		onSuccess: data => {
			queryClient.setQueryData(['workout-session', trainingDayId], data)
		},
	})

	const logExerciseMutation = useMutation({
		mutationFn: (dto: CreateWorkoutLogDto) => workoutService.logExercise(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['workout-session', trainingDayId],
			})
		},
	})

	const completeSessionMutation = useMutation({
		mutationFn: (sessionId: string) =>
			workoutService.completeSession(sessionId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['workout-session', trainingDayId],
			})
			queryClient.invalidateQueries({ queryKey: ['training-plan'] })
		},
	})

	return {
		session,
		isLoading,
		refetchSession: refetch,
		startSession: startSessionMutation.mutateAsync,
		isStarting: startSessionMutation.isPending,
		logExercise: logExerciseMutation.mutateAsync,
		isLogging: logExerciseMutation.isPending,
		completeSession: completeSessionMutation.mutateAsync,
		isCompleting: completeSessionMutation.isPending,
	}
}
