import { axiosInstance } from '@/lib/axios'
import { IAuthResponse, ILoginDto, IRegisterDto } from '@/types/auth.types'

export const AuthService = {
	register: async (dto: IRegisterDto): Promise<IAuthResponse> => {
		const { data } = await axiosInstance.post('/auth/register', dto)
		return data
	},

	login: async (dto: ILoginDto): Promise<IAuthResponse> => {
		const { data } = await axiosInstance.post('/auth/login', dto)
		return data
	},

	logout: async (): Promise<void> => {
		await axiosInstance.post('/auth/logout')
	},

	refresh: async (): Promise<IAuthResponse> => {
		const { data } = await axiosInstance.post('/auth/refresh')
		return data
	},
}
