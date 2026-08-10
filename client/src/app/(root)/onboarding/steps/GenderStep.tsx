import Radio from '@/components/ui/Radio'
import { GENDER } from '@/constants/onboarding'
import { IStepsProps } from '@/types/onboarding.types'
import { Gender } from '@/types/profile.types'

export default function GenderStep({ form }: IStepsProps) {
	const value = form.watch('gender')
	return (
		<>
			<h1 className='text-center text-5xl font-alumni mb-[15px] uppercase'>
				WHAT IS YOUR GENDER?
			</h1>
			<div className='text-center flex flex-col max-w-[400px] gap-[10px] ml-auto mr-auto'>
				{GENDER.map(option => (
					<Radio
						key={option.value}
						value={option.value}
						title={option.title}
						checked={value === option.value}
						onChange={selectedGender =>
							form.setValue('gender', selectedGender as Gender, {
								shouldValidate: true,
							})
						}
					/>
				))}
			</div>
		</>
	)
}
