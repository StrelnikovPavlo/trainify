import { axiosClassic } from '@/lib/axios'
import { IAuthResponse, ILoginDto, IRegisterDto } from '@/types/auth.types'

class AuthService {
	private BASE_URL = '/auth'

	async register(dto: IRegisterDto): Promise<IAuthResponse> {
		const { data } = await axiosClassic.post(`${this.BASE_URL}/register`, dto)
		return data
	}

	async login(dto: ILoginDto): Promise<IAuthResponse> {
		const { data } = await axiosClassic.post(`${this.BASE_URL}/login`, dto)
		return data
	}

	async refresh(): Promise<IAuthResponse> {
		const { data } = await axiosClassic.post(`${this.BASE_URL}/refresh`)
		return data
	}

	async logout(): Promise<void> {
		await axiosClassic.post(`${this.BASE_URL}/logout`)
	}
}

export const authService = new AuthService()
