import {
	Equipment,
	Exercise,
	MuscleGroup,
	UserProfile
} from 'prisma/generated/prisma/client'

type ExerciseWithRelations = Exercise & {
	muscleGroup: MuscleGroup
	equipment: Equipment
}

export function buildTrainingPlanPrompt(
	userProfile: UserProfile,
	exercises: ExerciseWithRelations[],
	durationDays: number
) {
	const exercisesList = exercises
		.map(
			ex =>
				`- id: ${ex.id} | name: ${ex.name} | muscleGroup: ${ex.muscleGroup.name} | equipment: ${ex.equipment.name}`
		)
		.join('\n')

	return `You are a professional fitness coach AI. Generate a personalized ${durationDays}-day training plan based on the user profile below.

USER PROFILE:
- Age: ${userProfile.age}
- Weight: ${userProfile.weight} kg
- Target weight: ${userProfile.targetWeight} kg
- Height: ${userProfile.height} cm
- Gender: ${userProfile.gender}
- Experience level: ${userProfile.level}
- Goal: ${userProfile.goal}
- Activity level: ${userProfile.activity}
- Preferred workout type: ${userProfile.workoutType}
- Body type: ${userProfile.bodyType}

AVAILABLE EXERCISES (you MUST only use exerciseId values from this list, never invent new ones):
${exercisesList}

RULES:
1. Plan must cover exactly ${durationDays} days, numbered from 1 to ${durationDays}.
2. Mix training days and rest days appropriately based on the user's experience level and activity (typically 3-4 training days per week).
3. Rest days must have "isRestDay": true and an empty "exercises" array.
4. Training days must have "isRestDay": false and a non-empty "exercises" array.
5. Each exercise entry must reference a valid "exerciseId" from the list above — never invent an id or name.
6. Use realistic sets (typically 3-5), reps (typically 6-15 depending on the goal), and restSeconds (typically 30-120).
7. The "order" field defines the sequence of exercises within a day, starting from 1.
8. Balance muscle groups across the week — avoid training the same muscle group on consecutive days.
9. Adjust exercise selection and equipment based on the user's goal (${userProfile.goal}) and workout type (${userProfile.workoutType}).

RESPONSE FORMAT:
Return ONLY valid JSON, with no markdown formatting, no code fences, no explanations, no additional text before or after. The JSON must match this exact structure:

{
  "name": "string - a short descriptive name for the plan",
  "durationDays": ${durationDays},
  "days": [
    {
      "dayNumber": 1,
      "isRestDay": false,
      "exercises": [
        {
          "exerciseId": "string - must exist in the provided exercise list",
          "sets": 3,
          "reps": 10,
          "restSeconds": 60,
          "order": 1
        }
      ]
    }
  ]
}`
}
