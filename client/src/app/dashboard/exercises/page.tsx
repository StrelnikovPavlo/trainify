import { Metadata } from 'next'
import Exercises from './Exercises'

export const metadata: Metadata = {
	title: 'Exercises | Trainify platform',
}

export default function ExercisesPage() {
	return <Exercises />
}
