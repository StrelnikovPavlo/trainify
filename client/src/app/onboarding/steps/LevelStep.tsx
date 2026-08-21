import Radio from '@/components/ui/Radio'
import { LEVEL } from '@/constants/onboarding'
import { IStepsProps } from '@/types/onboarding.types'
import { Level } from '@/types/profile.types'

export default function LevelStep({form}: IStepsProps) {
	const value = form.watch('level')
	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[15px] uppercase'>
				WHAT IS YOUR TRAINING LEVEL?
			</h1>
			<div className='text-center flex flex-col max-w-[400px] gap-[10px] ml-auto mr-auto'>
				{LEVEL.map(option => (
					<Radio
						key={option.value}
						value={option.value}
						title={option.title}
						description={option.description}
						checked={value === option.value}
						onChange={selectedLevel =>
							form.setValue('level', selectedLevel as Level, {
								shouldValidate: true,
							})
						}
					/>
				))}
			</div>
		</>
	)
}
