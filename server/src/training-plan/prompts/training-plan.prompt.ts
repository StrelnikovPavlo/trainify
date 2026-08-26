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
	exercises: ExerciseWithRelations[]
) {
	const exercisesList = exercises
		.map(
			ex =>
				`- id: ${ex.id} | ${ex.name} | ${ex.muscleGroup.name} | ${ex.equipment.name}`
		)
		.join('\n')

	return `You are a professional fitness coach AI. Generate a personalized training split for this user.

USER PROFILE:
- Age: ${userProfile.age}, ${userProfile.gender}, ${userProfile.height}cm, ${userProfile.weight}kg → target ${userProfile.targetWeight}kg
- Level: ${userProfile.level}
- Goal: ${userProfile.goal}
- Activity: ${userProfile.activity}
- Workout type: ${userProfile.workoutType}
- Body type: ${userProfile.bodyType}

AVAILABLE EXERCISES (use ONLY these exerciseId values, never invent any):
${exercisesList}

RULES:

1. Duration: 3 or 4 training days total (no rest-day entries — every day is a training day). Choose 3 for lower activity/beginners, 4 for higher activity/intermediate-advanced, based on the profile.

2. Split, not Full Body — EXCEPT for BEGINNER level, which must use Full Body on every day.
   Non-beginners: pick an appropriate split (e.g. Push/Pull/Legs, Upper/Lower, Push/Pull/Legs/Upper) matching level, goal and workout type. Never repeat the same primary muscle group on consecutive days unless the split calls for it.

3. Periodization via %1RM (estimated, based on user level/goal — no real 1RM data exists):
   - Vary intensity across days and across the week's structure, not identical sets/reps everywhere.
   - Strength/compound-focused days: lower reps (4-6), higher %1RM (~80-90%), longer rest (90-180s).
   - Hypertrophy-focused days: moderate reps (8-12), moderate %1RM (~65-80%), moderate rest (60-90s).
   - Endurance/isolation work: higher reps (12-15), lower %1RM (~50-65%), shorter rest (30-60s).
   - Beginners: stay mostly in the 65-75% %1RM range, 8-15 reps, prioritize technique over intensity.
   - Sets: 2-5 depending on exercise role (compound vs isolation) and level.

4. Each day: meaningful name (e.g. "Push", "Legs", "Upper Body"), non-empty exercises array, exercises matching the day's target muscle groups.

5. order starts from 1 per day.

OUTPUT: Return ONLY valid JSON, no markdown, no explanations, matching exactly:

{
  "name": "string",
  "durationDays": 3,
  "days": [
    {
      "dayNumber": 1,
      "name": "Push",
      "isRestDay": false,
      "exercises": [
        { "exerciseId": "valid id", "sets": 3, "reps": 8, "restSeconds": 90, "order": 1 }
      ]
    }
  ]
}`
}
