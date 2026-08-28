import { Metadata } from 'next'
import Onboarding from './Onboarding'

export const metadata: Metadata = {
	title: 'Onboarding | Trainify platform',
}

export default function OnboardingPage() {
	return <Onboarding />
}
