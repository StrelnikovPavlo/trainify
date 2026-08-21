import { useProfile } from './useProfile'
import { useTrainingPlan } from './useTrainingPlan'

export function useDashboard() {
	const { data: profile, isLoading: profileLoading } = useProfile()
	const { data: plan, isLoading: planLoading } = useTrainingPlan()

	const days = (plan?.trainingDays || []).slice(0, 7)

	const today = new Date()
	const todayDate = today.toISOString().split('T')[0]

	const todayIndex = days.findIndex(
		day => day.date?.split('T')[0] === todayDate,
	)

	const todayWorkout = todayIndex >= 0 ? days[todayIndex] : days[0]

	const formattedDate = today.toLocaleDateString('en-US', {
		timeZone: 'Europe/Warsaw',
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	})

	const username = profile?.user?.username

	return {
		days,
		profile,
		profileLoading,
		todayIndex,
		planLoading,
		todayWorkout,
		formattedDate,
		username,
		todayDate
	}
}
