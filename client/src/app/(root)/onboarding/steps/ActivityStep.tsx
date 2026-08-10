import Radio from '@/components/ui/Radio'
import { ACTIVITY_LEVELS } from '@/constants/onboarding'
import { IStepsProps } from '@/types/onboarding.types'
import { Activity } from '@/types/profile.types'

export default function ActivityStep({ form }: IStepsProps) {
	const value = form.watch('activity')

	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[15px] uppercase'>
				What is your activity level?
			</h1>
			<div className='text-center flex flex-col max-w-[400px] gap-[10px] ml-auto mr-auto'>
				{ACTIVITY_LEVELS.map(option => (
					<Radio
						key={option.value}
						value={option.value}
						title={option.title}
						description={option.description}
						checked={value === option.value}
						onChange={selectedActivity =>
							form.setValue('activity', selectedActivity as Activity, {
								shouldValidate: true,
							})
						}
					/>
				))}
			</div>
		</>
	)
}
