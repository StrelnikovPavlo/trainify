import { ONBOARDING_STEPS } from '@/config/onboarding.config'
import { getErrorMessage } from '@/lib/get-error-message'
import { userService } from '@/services/profile.service'
import { trainingPlanService } from '@/services/training-plan.service'
import { IProfileForm } from '@/types/profile.types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export function useOnboarding() {
	const [currentStep, setCurrentStep] = useState(0)
	const { push } = useRouter()

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

	const createProfile = useMutation({
		mutationFn: (data: IProfileForm) => userService.create(data),
	})

	const generatePlan = useMutation({
		mutationKey: ['onboarding', 'generate-plan'],
		mutationFn: () => trainingPlanService.generate(),
		onSuccess: () => push('/dashboard'),
	})

	const onSubmit: SubmitHandler<IProfileForm> = async data => {
		try {
			await createProfile.mutateAsync(data)
		} catch (error) {
			const isAlreadyExists =
				axios.isAxiosError(error) && error.response?.status === 409

			if (!isAlreadyExists) return
		}

		generatePlan.mutate()
	}

	const retryGeneration = () => generatePlan.mutate()

	const isPending = createProfile.isPending || generatePlan.isPending
	const isGenerationError = createProfile.isSuccess && generatePlan.isError
	const apiError = createProfile.isError
		? getErrorMessage(createProfile.error)
		: generatePlan.isError
			? getErrorMessage(generatePlan.error)
			: null

	return {
		form,
		CurrentStepComponent,
		currentStep,
		TOTAL_STEPS,
		nextStep,
		prevStep,
		onSubmit,
		isNextDisabled,
		isPending,
		isGenerationError,
		apiError,
		retryGeneration,
	}
}
