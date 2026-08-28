import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
})

export const axiosClassic = axios.create({
	baseURL: API_URL,
	withCredentials: true,
})

axiosInstance.interceptors.request.use(config => {
	const token = useAuthStore.getState().accessToken

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes('/auth/refresh')
		) {
			originalRequest._retry = true

			try {
				const data = await authService.refresh()

				useAuthStore.getState().setAccessToken(data.accessToken)
				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

				return axiosInstance(originalRequest)
			} catch (refreshError) {
				useAuthStore.getState().setAccessToken(null)
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	},
)
