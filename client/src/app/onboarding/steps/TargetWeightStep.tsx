import { Input } from '@/components/ui/Input'
import { IStepsProps } from '@/types/onboarding.types'

export default function TargetWeightStep({ form }: IStepsProps) {
	return (
		<div className='flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-2 sm:px-0'>
			<h1 className='text-center text-3xl sm:text-4xl md:text-5xl font-alumni mb-6 sm:mb-8 uppercase font-bold tracking-tight text-[#231f1f]'>
				Your Target weight?
			</h1>
			<div className='w-full flex flex-col items-center gap-3 sm:gap-4'>
				<Input
					{...form.register('targetWeight', {
						required: 'Number is required',
						min: { value: 40, message: 'Min 40' },
						max: { value: 140, message: 'Max 140' },
						valueAsNumber: true,
					})}
					placeholder='Number'
					type='number'
					className='h-[70px] max-w-[350px] ml-auto mr-auto'
				/>
				<p className='text-xs sm:text-sm text-black/40 text-center font-medium max-w-[260px] sm:max-w-none'>
					Please, enter a value from 40 kg to 140 kg
				</p>
			</div>
		</div>
	)
}
