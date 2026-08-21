import { axiosInstance } from '@/lib/axios'
import { IProfile, IProfileForm } from '@/types/profile.types'

class UserService {
	private BASE_URL = '/user-profile'

	async create(dto: IProfileForm) {
		const { data } = await axiosInstance.post<IProfile>(this.BASE_URL, dto)
		return data
	}

	async getProfile() {
		const { data } = await axiosInstance.get<IProfile>(`${this.BASE_URL}/me`)
		return data
	}
}

export const userService = new UserService()
