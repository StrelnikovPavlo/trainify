import Radio from '@/components/ui/Radio'
import { WORKOUT_TYPE } from '@/constants/onboarding'
import { IStepsProps } from '@/types/onboarding.types'
import { WorkoutType } from '@/types/profile.types'

export default function WorkoutTypeStep({ form }: IStepsProps) {
	const value = form.watch('workoutType')
	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[15px] uppercase'>
				WHERE DO YOU PREFER TO WORK OUT?
			</h1>
			<div className='text-center flex flex-col max-w-[400px] gap-[10px] ml-auto mr-auto'>
				{WORKOUT_TYPE.map(option => (
					<Radio
						key={option.value}
						value={option.value}
						title={option.title}
						description={option.description}
						checked={value === option.value}
						onChange={selectedWorkoutType =>
							form.setValue('workoutType', selectedWorkoutType as WorkoutType, {
								shouldValidate: true,
							})
						}
					/>
				))}
			</div>
		</>
	)
}
