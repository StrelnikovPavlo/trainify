'use client'

import { OnboardingLoader } from '@/components/onboarding/OnboardingLoader'
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
		isGenerating,
	} = useOnboarding()
	
	if (isGenerating) {
		return <OnboardingLoader />
	}

	return (
		<div className='min-h-screen bg-gray-50/50 pb-12'>
			<header className='relative border-b border-black/[0.05] bg-white'>
				<div className='container mx-auto flex h-[64px] items-center justify-between px-4 font-alumni'>
					<a className='text-3xl font-bold uppercase tracking-tight text-[#18181b]'>
						Trainify
					</a>
					<div className='text-2xl font-bold text-black/50'>
						{currentStep + 1}/{TOTAL_STEPS}
					</div>
				</div>
				<div className='absolute -bottom-[2px] left-0 h-[3px] w-full bg-neutral-200'>
					<div
						className='h-full bg-black transition-all duration-300'
						style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
					/>
				</div>
			</header>

			<div className='relative flex flex-col items-center justify-center px-4'>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='mt-12 w-full max-w-[600px] rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-xl shadow-black/5 sm:mt-16 sm:p-10'
				>
					<CurrentStepComponent form={form} />

					<div className='mt-8 flex justify-center gap-3'>
						{currentStep > 0 && (
							<Button
								type='button'
								onClick={prevStep}
								className='btn-black px-6 py-3 text-[12px] font-extrabold uppercase tracking-wider'
							>
								Prev
							</Button>
						)}

						{currentStep < TOTAL_STEPS - 1 ? (
							<Button
								type='button'
								onClick={nextStep}
								disabled={isNextDisabled}
								className={clsx(
									'btn-yellow px-8 py-3 text-[12px] font-black uppercase tracking-wider',
									isNextDisabled &&
										'bg-neutral-200 text-gray-400 cursor-default opacity-60',
								)}
							>
								Next
							</Button>
						) : (
							<Button
								type='submit'
								className='btn-yellow px-10 py-3.5 text-[13px] font-black uppercase tracking-wider shadow-lg shadow-primary/20'
							>
								Finish
							</Button>
						)}
					</div>

					{errorMessage && (
						<div className='mt-5 rounded-[18px] border border-red-200 bg-red-50 p-4 text-center'>
							<FormError message={errorMessage} />
						</div>
					)}
				</form>
			</div>
		</div>
	)
}
