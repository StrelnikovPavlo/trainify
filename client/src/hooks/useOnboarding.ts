import { ONBOARDING_STEPS } from '@/config/onboarding.config'
import { userService } from '@/services/profile.service'
import { trainingPlanService } from '@/services/training-plan.service'
import { IProfileForm } from '@/types/profile.types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useOnboarding() {
	const [currentStep, setCurrentStep] = useState(0)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isGenerating, setIsGenerating] = useState(false)
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
			setIsGenerating(true)

			// 1. Зберігаємо дані профілю
			await userService.create(data)

			// 2. Викликаємо генерацію плану
			await trainingPlanService.generate()

			// 3. Перенаправляємо на дашборд
			router.push('/dashboard')
		} catch (error) {
			setIsGenerating(false)
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message
				setErrorMessage(
					Array.isArray(message)
						? message[0]
						: (message ?? 'Something went wrong while generating your plan'),
				)
			} else {
				setErrorMessage('An unexpected error occurred')
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
		isGenerating,
	}
}
