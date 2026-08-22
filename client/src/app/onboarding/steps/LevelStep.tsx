import Radio from '@/components/ui/Radio'
import { LEVEL } from '@/constants/onboarding'
import { IStepsProps } from '@/types/onboarding.types'
import { Level } from '@/types/profile.types'

export default function LevelStep({ form }: IStepsProps) {
	const value = form.watch('level')
	return (
		<div className='flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-2 sm:px-0'>
			<h1 className='text-center text-3xl sm:text-4xl md:text-5xl font-alumni mb-6 sm:mb-8 uppercase font-bold tracking-tight text-[#231f1f]'>
				WHAT IS YOUR TRAINING LEVEL?
			</h1>
			<div className='w-full flex flex-col gap-3 sm:gap-4'>
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
		</div>
	)
}
