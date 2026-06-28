import { useAuthStore } from '@/store/auth.store'
import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
})

axiosInstance.interceptors.request.use(config => {
	const token = useAuthStore.getState().accessToken

	if (token) config.headers.Authorization = `Bearer ${token}`

	return config
})

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const original = error.config

		if (
			error.response?.status === 401 &&
			!original._retry &&
			!original.url?.includes('/auth/refresh')
		) {
			original._retry = true

			try {
				const { data } = await axiosInstance.post('/auth/refresh')
				useAuthStore.getState().setAccessToken(data.accessToken)
				original.headers.Authorization = `Bearer ${data.accessToken}`
				return axiosInstance(original)
			} catch {
				useAuthStore.getState().setAccessToken(null)
			}
		}
		return Promise.reject(error)
	},
)
