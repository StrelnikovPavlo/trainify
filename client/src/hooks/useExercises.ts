import { exerciseService } from '@/services/exercises.service'
import { useQuery } from '@tanstack/react-query'

export function useExercises() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['exercises'],
		queryFn: () => exerciseService.getAll(),
	})

	return { exercises: data ?? [], isLoading, isError }
}
