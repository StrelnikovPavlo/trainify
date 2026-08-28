import { Metadata } from 'next'
import MealPlan from './MealPlan'

export const metadata: Metadata = {
	title: 'Meal Plan | Trainify platform',
}

export default function MealPlanPage() {
	return <MealPlan />
}
