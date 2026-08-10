import { Input } from '@/components/ui/Input'
import { IStepsProps } from '@/types/onboarding.types'

export default function TargetWeightStep({ form }: IStepsProps) {
	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[30px] uppercase'>
				Your Target weight?
			</h1>
			<div className='text-center flex flex-col gap-[20px]'>
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
				<p className='text-[14px]'>
					Please, enter a value from 40 kg to 140 kg
				</p>
			</div>
		</>
	)
}
