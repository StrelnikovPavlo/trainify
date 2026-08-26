import { axiosInstance } from '@/lib/axios'
import { IProfile, IProfileForm, IUpdateUser } from '@/types/profile.types'

class UserService {
	private BASE_URL_PROFILE = '/user-profile'
	private BASE_URL_USERS = '/users'

	async create(dto: IProfileForm) {
		const { data } = await axiosInstance.post<IProfile>(
			this.BASE_URL_PROFILE,
			dto,
		)
		return data
	}

	async getProfile() {
		const { data } = await axiosInstance.get<IProfile>(
			`${this.BASE_URL_PROFILE}/me`,
		)
		return data
	}

	async update(userId: string, dto: IUpdateUser) {
		const { data } = await axiosInstance.put<IUpdateUser>(
			`${this.BASE_URL_USERS}/${userId}`,
			dto,
		)
		return data
	}

	async delete(userId: string) {
		const { data } = await axiosInstance.delete(
			`${this.BASE_URL_USERS}/${userId}`,
		)
		return data
	}
}

export const userService = new UserService()
