import { IAuthState } from '@/types/auth.types'
import { create } from 'zustand'

export const useAuthStore = create<IAuthState>(set => ({
	accessToken: null,
	isAuthenticated: false,
	setAccessToken: token =>
		set({
			accessToken: token,
			isAuthenticated: !!token,
		}),
}))
