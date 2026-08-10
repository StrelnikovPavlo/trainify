import { axiosInstance } from '@/lib/axios'
import { IProfileForm } from '@/types/profile.types'

export const ProfileService = {
	create: async (dto: IProfileForm) => {
		const { data } = await axiosInstance.post('/user-profile/', dto)
		return data
	},
	getProfile: async () => {
		return await axiosInstance.get('/user-profile/me')
	},
}
