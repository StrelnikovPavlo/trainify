import Radio from '@/components/ui/Radio'
import { BODY_TYPE } from '@/constants/onboarding'
import { IStepsProps } from '@/types/onboarding.types'
import { BodyType } from '@/types/profile.types'

export default function BodyTypeStep({ form }: IStepsProps) {
	const value = form.watch('bodyType')
	return (
		<div className='flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-2 sm:px-0'>
			<h1 className='text-center text-3xl sm:text-4xl md:text-5xl font-alumni mb-6 sm:mb-8 uppercase font-bold tracking-tight text-[#231f1f]'>
				HOW WOULD YOU DESCRIBE YOUR BUILD?
			</h1>
			<div className='w-full flex flex-col gap-3 sm:gap-4'>
				{BODY_TYPE.map(option => (
					<Radio
						key={option.value}
						value={option.value}
						title={option.title}
						checked={value === option.value}
						onChange={selectedType =>
							form.setValue('bodyType', selectedType as BodyType, {
								shouldValidate: true,
							})
						}
					/>
				))}
			</div>
		</div>
	)
}
