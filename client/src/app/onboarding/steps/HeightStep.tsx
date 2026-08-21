import { FormError } from '@/components/ui/Error'
import { Input } from '@/components/ui/Input'
import { IStepsProps } from '@/types/onboarding.types'

export default function HeightStep({ form }: IStepsProps) {
	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[30px] uppercase'>
				HOW TALL ARE YOU?
			</h1>
			<div className='text-center flex flex-col gap-[20px]'>
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
				<p className='text-[14px]'>
					Please, enter a value from 40 cm to 250 cm
				</p>
			</div>
		</>
	)
}
