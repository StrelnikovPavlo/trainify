import { UseFormReturn } from 'react-hook-form'
import { IProfileForm } from './profile.types'

export interface IStepsProps {
	form: UseFormReturn<IProfileForm>
}
