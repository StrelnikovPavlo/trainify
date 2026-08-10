'use client'

import { Button } from '@/components/ui/Button'
import { FormError } from '@/components/ui/Error'
import { useOnboarding } from '@/hooks/useOnboarding'
import clsx from 'clsx'

export default function Onboarding() {
	const {
		form,
		currentStep,
		CurrentStepComponent,
		TOTAL_STEPS,
		nextStep,
		prevStep,
		onSubmit,
		isNextDisabled,
		errorMessage,
	} = useOnboarding()

	return (
		<div>
			<header className='relative'>
				<div className='flex items-center justify-between container mx-auto h-[60px] font-alumni'>
					<a className='text-4xl'>Trainify</a>
					<div className='text-3xl'>
						{currentStep + 1}/{TOTAL_STEPS}
					</div>
				</div>
				<div className='absolute -bottom-1 left-0 w-full h-1 bg-neutral-200'>
					<div
						className='h-1 bg-black transition-all'
						style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
					/>
				</div>
			</header>
			<div className='relative flex flex-col items-center justify-center w-full h-full'>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='mb-[30px] max-w-[600px] mx-auto w-full mt-[100px]'
				>
					<CurrentStepComponent form={form} />
					<div className='flex justify-center mt-[20px] gap-4'>
						{currentStep > 0 && (
							<Button type='button' onClick={prevStep} className='btn-black'>
								Prev
							</Button>
						)}
						{currentStep < TOTAL_STEPS - 1 ? (
							<Button
								type='button'
								onClick={nextStep}
								disabled={isNextDisabled}
								className={clsx(
									'btn-yellow',
									isNextDisabled && 'text-gray bg-neutral-200 cursor-default',
								)}
							>
								Next
							</Button>
						) : (
							<Button type='submit' className='btn-yellow'>
								Finish
							</Button>
						)}
					</div>
					{errorMessage && (
						<div className='bg-red-50 border border-red-200 rounded-[10px] px-4 py-3 mt-[20px] text-center'>
							<FormError message={errorMessage} />
						</div>
					)}
				</form>
			</div>
		</div>
	)
}
