import ActivityStep from '@/app/onboarding/steps/ActivityStep'
import AgeStep from '@/app/onboarding/steps/AgeStep'
import BodyTypeStep from '@/app/onboarding/steps/BodyTypeStep'
import GenderStep from '@/app/onboarding/steps/GenderStep'
import GoalStep from '@/app/onboarding/steps/GoalStep'
import HeightStep from '@/app/onboarding/steps/HeightStep'
import LevelStep from '@/app/onboarding/steps/LevelStep'
import TargetWeightStep from '@/app/onboarding/steps/TargetWeightStep'
import WeightStep from '@/app/onboarding/steps/WeightStep'
import WorkoutTypeStep from '@/app/onboarding/steps/WorkoutTypeStep'
import { IProfileForm } from '@/types/profile.types'

export const ONBOARDING_STEPS: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: React.ComponentType<{ form: any }>
	field: keyof IProfileForm
}[] = [
	{ component: AgeStep, field: 'age' },
	{ component: GenderStep, field: 'gender' },
	{ component: WeightStep, field: 'weight' },
	{ component: HeightStep, field: 'height' },
	{ component: TargetWeightStep, field: 'targetWeight' },
	{ component: LevelStep, field: 'level' },
	{ component: GoalStep, field: 'goal' },
	{ component: ActivityStep, field: 'activity' },
	{ component: WorkoutTypeStep, field: 'workoutType' },
	{ component: BodyTypeStep, field: 'bodyType' },
]
