import { AuthService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { IAuthForm } from '@/types/auth.types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function useAuth() {
	const [isRegister, setIsRegister] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const router = useRouter()
	const setAccessToken = useAuthStore(state => state.setAccessToken)
	const form = useForm<IAuthForm>()

	const isAuthenticated = useAuthStore(state => state.isAuthenticated)

	useEffect(() => {
		if (isAuthenticated) router.push('/onboarding')
	}, [isAuthenticated])

	const toggleMode = () => {
		setIsRegister(prev => !prev)
		setErrorMessage(null)
		form.reset()
	}

	const onSubmit = async (data: IAuthForm) => {
		try {
			setErrorMessage(null)
			const { accessToken } = isRegister
				? await AuthService.register(data)
				: await AuthService.login(data)

			setAccessToken(accessToken)

			if (isRegister) {
				router.push('/onboarding')
			} else {
				router.push('/dashboard')
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message
				setErrorMessage(
					Array.isArray(message)
						? message[0]
						: (message ?? 'Something went wrong'),
				)
			}
		}
	}

	return {
		isRegister,
		errorMessage,
		toggleMode,
		onSubmit,
		form,
	}
}
