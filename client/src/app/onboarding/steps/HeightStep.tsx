import { Input } from '@/components/ui/Input'
import { IStepsProps } from '@/types/onboarding.types'

export default function HeightStep({ form }: IStepsProps) {
	return (
		<div className='flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-2 sm:px-0'>
			<h1 className='text-center text-3xl sm:text-4xl md:text-5xl font-alumni mb-6 sm:mb-8 uppercase font-bold tracking-tight text-[#231f1f]'>
				HOW TALL ARE YOU?
			</h1>
			<div className='w-full flex flex-col items-center gap-3 sm:gap-4'>
				<Input
					{...form.register('height', {
						required: 'Height is required',
						min: { value: 40, message: 'Min 40' },
						max: { value: 250, message: 'Max 250' },
						valueAsNumber: true,
					})}
					placeholder='Cm'
					type='number'
					className='h-[70px] max-w-[350px] ml-auto mr-auto'
				/>
				<p className='text-xs sm:text-sm text-black/40 text-center font-medium max-w-[260px] sm:max-w-none'>
					Please, enter a value from 40 cm to 250 cm
				</p>
			</div>
		</div>
	)
}
