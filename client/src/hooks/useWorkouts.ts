import { useTrainingPlan } from './useTrainingPlan'

export function useWorkouts() {
	const { data: trainingPlan, isLoading, isError } = useTrainingPlan()
	const trainingDays = trainingPlan?.trainingDays || []

	const currentDate = new Date()

	const currentDateString = currentDate.toISOString().split('T')[0]

	const currentTrainingDay = trainingDays.find(
		day => day.date?.split('T')[0] === currentDateString,
	)

	const currentDayIndex = trainingDays.findIndex(
		day => day.date?.split('T')[0] === currentDateString,
	)

	const trainingDayNumber = currentDayIndex >= 0 ? currentDayIndex + 1 : 1

	const completedTrainingDays = trainingDays.filter(
		day => !day.isRestDay,
	).length

	const trainingProgress =
		currentDayIndex >= 0 && trainingDays.length > 0
			? Math.round(((currentDayIndex + 1) / trainingDays.length) * 100)
			: 0

	const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	})

	return {
		trainingDays,
		isLoading,
		isError,
		trainingPlan,
		currentDateString,
		currentTrainingDay,
		currentDayIndex,
		trainingDayNumber,
		completedTrainingDays,
		trainingProgress,
		formattedCurrentDate,
	}
}
