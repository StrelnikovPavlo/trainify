import { Input } from '@/components/ui/Input'
import { IStepsProps } from '@/types/onboarding.types'

export default function AgeStep({ form }: IStepsProps) {
	return (
		<div className='flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-2 sm:px-0'>
			<h1 className='text-center text-3xl sm:text-4xl md:text-5xl font-alumni mb-6 sm:mb-8 uppercase font-bold tracking-tight text-[#231f1f]'>
				How old are you?
			</h1>

			<div className='w-full flex flex-col items-center gap-3 sm:gap-4'>
				<Input
					{...form.register('age', {
						required: 'Age is required',
						min: { value: 16, message: 'Min 16' },
						max: { value: 80, message: 'Max 80' },
						valueAsNumber: true,
					})}
					placeholder='25'
					type='number'
					inputMode='numeric'
					className='h-[56px] sm:h-[64px] w-full max-w-[280px] sm:max-w-[320px] text-center text-2xl font-semibold rounded-2xl border-black/[0.08] bg-white shadow-sm outline-none transition-all placeholder:text-black/20 focus:border-black/30 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
				/>

				<p className='text-xs sm:text-sm text-black/40 text-center font-medium max-w-[260px] sm:max-w-none'>
					Please enter a value between 16 and 80 years old
				</p>
			</div>
		</div>
	)
}
