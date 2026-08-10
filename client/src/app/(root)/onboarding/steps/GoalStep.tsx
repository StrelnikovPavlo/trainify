import Radio from '@/components/ui/Radio'
import { GOAL } from '@/constants/onboarding'
import { IStepsProps } from '@/types/onboarding.types'
import { Goal } from '@/types/profile.types'

export default function GoalStep({ form }: IStepsProps) {
	const value = form.watch('goal')
	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[15px] uppercase'>
				WHAT IS YOUR TRAINING GOAL?
			</h1>
			<div className='text-center flex flex-col max-w-[400px] gap-[10px] ml-auto mr-auto'>
				{GOAL.map(option => (
					<Radio
						key={option.value}
						value={option.value}
						title={option.title}
						checked={value === option.value}
						onChange={selectedGoal =>
							form.setValue('goal', selectedGoal as Goal, {
								shouldValidate: true,
							})
						}
					/>
				))}
			</div>
		</>
	)
}
