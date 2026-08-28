import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { IAuthForm } from '@/types/auth.types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export function useAuth() {
	const { push } = useRouter()
	const [isRegister, setIsRegister] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors: validationErrors },
	} = useForm<IAuthForm>({
		mode: 'onSubmit',
	})
	const setAccessToken = useAuthStore(state => state.setAccessToken)

	const { mutate, isPending, error: apiError, reset: resetMutation } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			isRegister ? authService.register(data) : authService.login(data),
		onSuccess: ({ accessToken }) => {
			setAccessToken(accessToken)
			push(isRegister ? DASHBOARD_PAGES.ONBOARDING : DASHBOARD_PAGES.HOME)
		}
	})

	const toggleMode = () => {
		setIsRegister(prev => !prev)
		reset()
		resetMutation()
	}

	const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data)

	return {
		toggleMode,
		onSubmit,
		register,
		handleSubmit,
		isRegister,
		isPending,
		validationErrors,
		apiError
	}
}
