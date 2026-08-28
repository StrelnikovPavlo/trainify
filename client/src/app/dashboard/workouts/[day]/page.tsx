import { Metadata } from 'next'
import { Workout } from './WorkoutPage'

export const metadata: Metadata = {
	title: `Training day | Trainify platform`,
}

export default function WorkoutPage() {
	return <Workout />
}
