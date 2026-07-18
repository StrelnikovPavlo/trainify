import { AuthState } from '@/types/auth.types'
import { create } from 'zustand'

export const useAuthStore = create<AuthState>(set => ({
	accessToken: null,
	isAuthenticated: false,
	setAccessToken: token =>
		set({
			accessToken: token,
			isAuthenticated: !!token,
		}),
}))
