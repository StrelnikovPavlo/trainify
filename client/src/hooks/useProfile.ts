import { userService } from '@/services/profile.service'
import { useAuthStore } from '@/store/auth.store'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const accessToken = useAuthStore(state => state.accessToken)

	const { data, isLoading } = useQuery({
		queryKey: ['profile', accessToken],
		queryFn: () => userService.getProfile(),
		enabled: !!accessToken,
	})

	return { data, isLoading }
}
