import Radio from '@/components/ui/Radio'
import { BODY_TYPE } from '@/constants/onboarding'
import { IStepsProps } from '@/types/onboarding.types'
import { BodyType } from '@/types/profile.types'

export default function BodyTypeStep({ form }: IStepsProps) {
	const value = form.watch('bodyType')
	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[15px] uppercase'>
				HOW WOULD YOU DESCRIBE YOUR BUILD?
			</h1>
			<div className='text-center flex flex-col max-w-[400px] gap-[10px] ml-auto mr-auto'>
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
		</>
	)
}
