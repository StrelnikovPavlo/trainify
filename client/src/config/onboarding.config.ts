import ActivityStep from '@/app/(root)/onboarding/steps/ActivityStep'
import AgeStep from '@/app/(root)/onboarding/steps/AgeStep'
import BodyTypeStep from '@/app/(root)/onboarding/steps/BodyTypeStep'
import GenderStep from '@/app/(root)/onboarding/steps/GenderStep'
import GoalStep from '@/app/(root)/onboarding/steps/GoalStep'
import HeightStep from '@/app/(root)/onboarding/steps/HeightStep'
import LevelStep from '@/app/(root)/onboarding/steps/LevelStep'
import TargetWeightStep from '@/app/(root)/onboarding/steps/TargetWeightStep'
import WeightStep from '@/app/(root)/onboarding/steps/WeightStep'
import WorkoutTypeStep from '@/app/(root)/onboarding/steps/WorkoutTypeStep'
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
