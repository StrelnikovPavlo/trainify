import { ONBOARDING_STEPS } from '@/config/onboarding.config'
import { ProfileService } from '@/services/profile.service'
import { IProfileForm } from '@/types/profile.types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useOnboarding() {
	const [currentStep, setCurrentStep] = useState(0)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const router = useRouter()
	const form = useForm<IProfileForm>({
		mode: 'onChange',
	})

	const TOTAL_STEPS = ONBOARDING_STEPS.length

	const { component: CurrentStepComponent, field: currentField } =
		ONBOARDING_STEPS[currentStep]

	const currentValue = form.watch(currentField)
	const currentError = form.formState.errors[currentField]
	const isNextDisabled = !currentValue || !!currentError

	const nextStep = () => {
		if (currentStep < TOTAL_STEPS - 1) setCurrentStep(prev => prev + 1)
	}

	const prevStep = () => {
		if (currentStep > 0) setCurrentStep(prev => prev - 1)
	}

	const onSubmit = async (data: IProfileForm) => {
		try {
			setErrorMessage(null)
			await ProfileService.create(data)
			router.push('/dashboard')
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
		form,
		CurrentStepComponent,
		currentStep,
		TOTAL_STEPS,
		nextStep,
		prevStep,
		onSubmit,
		isNextDisabled,
		errorMessage,
	}
}
