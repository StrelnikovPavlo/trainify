import { authService } from '@/services/auth.service'
import { userService } from '@/services/profile.service'
import { useAuthStore } from '@/store/auth.store'
import { IUpdateProfile, IUpdateUser } from '@/types/profile.types'
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

	// User data
	const updateUserMutation = useMutation({
		mutationFn: (dto: IUpdateUser) => userService.update(user!.id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
	})

	// Physical data
	const updatePhysicalProfileMutation = useMutation({
		mutationFn: (dto: IUpdateProfile) =>
			userService.updateProfile(user!.id, dto),
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
		updateUser: updateUserMutation.mutateAsync,
		updatePhysicalProfile: updatePhysicalProfileMutation.mutateAsync,
		isUpdating:
			updateUserMutation.isPending || updatePhysicalProfileMutation.isPending,
		updateError:
			updateUserMutation.error || updatePhysicalProfileMutation.error,
		deleteAccount: deleteMutation.mutateAsync,
		isDeleting: deleteMutation.isPending,
	}
}
