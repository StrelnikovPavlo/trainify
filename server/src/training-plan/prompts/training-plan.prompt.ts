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

	return `You are a professional fitness coach AI.

Generate a personalized ${durationDays}-day training program based on the user's profile below.
Day 1 = Monday, Day 2 = Tuesday, and so on, cycling weekly (Day 8 = Monday again, etc).

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

AVAILABLE EXERCISES:
${exercisesList}

You MUST only use exerciseId values from AVAILABLE EXERCISES. Never invent exercises, IDs, muscle groups or equipment.

WEEKLY SPLIT (mandatory for intermediate and advanced users):
- Monday: Legs
- Wednesday: Chest
- Friday: Back
- Saturday: optional — include only if periodization calls for extra work (e.g. a lagging muscle group, arms, shoulders or core); otherwise mark it as Rest
- Tuesday, Thursday, Sunday: Rest

FULL BODY workouts are allowed ONLY for beginners, replacing the split above with full-body sessions and rest days spread evenly through the week.

DAY RULES:
1. Rest days: isRestDay: true, name: "Rest", exercises: [].
2. Training days: isRestDay: false, a descriptive name matching the day's focus (e.g. "Legs", "Chest", "Back", "Full Body"), non-empty exercises array targeting that day's muscles.
3. "order" starts from 1 within each day.

PERIODIZATION:
Do not repeat identical sets/reps throughout the program — progress the stimulus over time via rep ranges, set counts, rest periods, volume or intensity, appropriate to experience level:
- Beginner: 8-15 reps, 2-4 sets, moderate intensity, technique focus.
- Intermediate: 6-12 reps, 3-5 sets, progressive overload.
- Advanced: 5-12 reps, higher volume, structured intensity variation.

EXERCISE RULES:
- Sets: 2-5. Reps: 5-15. restSeconds: 30-180.
- Compound lifts: lower reps, higher rest. Isolation: higher reps, shorter rest.
- Exercises must match the day's target muscle groups — no unrelated mixing, no excessive volume.

RESPONSE FORMAT:
Return ONLY valid JSON, no markdown, no code fences, no explanations, matching exactly:

{
  "name": "string - descriptive name of the complete training program",
  "durationDays": ${durationDays},
  "days": [
    {
      "dayNumber": 1,
      "name": "Legs",
      "isRestDay": false,
      "exercises": [
        {
          "exerciseId": "valid exercise id",
          "sets": 3,
          "reps": 10,
          "restSeconds": 90,
          "order": 1
        }
      ]
    },
    {
      "dayNumber": 2,
      "name": "Rest",
      "isRestDay": true,
      "exercises": []
    }
  ]
}

The final program must contain exactly ${durationDays} days, follow the weekly split above (or full body for beginners), use realistic periodized sets/reps/rest, and reference ONLY exercise IDs from AVAILABLE EXERCISES.
`
}
