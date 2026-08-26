import { authService } from '@/services/auth.service'
import { userService } from '@/services/profile.service'
import { useAuthStore } from '@/store/auth.store'
import { IUpdateUser } from '@/types/profile.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useProfile() {
	const accessToken = useAuthStore(state => state.accessToken)
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: ['profile', accessToken],
		queryFn: () => userService.getProfile(),
		enabled: !!accessToken,
	})

	const user = data?.user

	const updateMutation = useMutation({
		mutationFn: (dto: IUpdateUser) => userService.update(user!.id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
	})

	const deleteMutation = useMutation({
		mutationFn: async () => {
			if (!data?.user?.id) throw new Error('User ID is missing')
			await userService.delete(data.user.id)
			await authService.logout()
		},
		onSuccess: () => {
			queryClient.clear()
		},
	})

	return {
		data,
		user,
		isLoading,
		updateProfile: updateMutation.mutateAsync,
		isUpdating: updateMutation.isPending,
		updateError: updateMutation.error,
		deleteAccount: deleteMutation.mutateAsync,
		isDeleting: deleteMutation.isPending,
	}
}
