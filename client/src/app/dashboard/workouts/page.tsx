import { Metadata } from 'next'
import Workouts from './Workouts'

export const metadata: Metadata = {
	title: 'Workouts | Trainify platform',
}

export default function WorkoutsPage() {
	return <Workouts />
}
