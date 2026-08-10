import { Input } from '@/components/ui/Input'
import { IStepsProps } from '@/types/onboarding.types'

export default function AgeStep({ form }: IStepsProps) {
	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[30px] uppercase'>
				How old are you?
			</h1>
			<div className='text-center flex flex-col gap-[20px]'>
				<Input
					{...form.register('age', {
						required: 'Age is required',
						min: { value: 16, message: 'Min 16' },
						max: { value: 80, message: 'Max 80' },
						valueAsNumber: true,
					})}
					placeholder='Number'
					type='number'
					className='h-[70px] max-w-[350px] ml-auto mr-auto'
				/>
				<p className='text-[14px]'>
					Please, enter a value from 16 years to 85 years
				</p>
			</div>
		</>
	)
}
