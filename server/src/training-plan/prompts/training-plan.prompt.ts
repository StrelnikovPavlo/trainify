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

Your task is to generate a personalized ${durationDays}-day training program based on the user's profile.

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

IMPORTANT:
You MUST only use exerciseId values from the AVAILABLE EXERCISES list.
Never invent exercises, exercise IDs, muscle groups or equipment.

TRAINING PROGRAM REQUIREMENTS:

1. Generate exactly ${durationDays} days.

2. The program MUST use an appropriate training split based on the user's experience level.

3. FULL BODY workouts are allowed ONLY for beginners.

4. For intermediate and advanced users, use a SPLIT program.

Possible split structures include:
- Push / Pull / Legs
- Upper / Lower
- Chest / Back / Legs
- Chest + Shoulders / Back + Biceps / Legs + Triceps
- Push / Pull / Legs / Rest
- Upper / Lower / Upper / Lower

Choose the split based on the user's experience level, goal, activity level and workout type.

5. Do NOT use the same muscle group on consecutive training days unless this is intentional and appropriate for the selected split.

6. Each TRAINING DAY must have a meaningful workout name.

Examples:
- "Chest"
- "Back"
- "Legs"
- "Chest + Shoulders"
- "Back + Biceps"
- "Legs + Abs"
- "Push"
- "Pull"
- "Upper Body"
- "Lower Body"

Workout names should describe the main muscle groups being trained.

7. REST DAYS must have:
- isRestDay: true
- name: "Rest"
- exercises: []

8. TRAINING DAYS must have:
- isRestDay: false
- name describing the workout
- non-empty exercises array

PERIODIZATION:

The program MUST use basic training periodization.

Do not generate 7 identical workouts with the same sets and reps.

Progress the training stimulus throughout the program.

Use variations such as:
- changing rep ranges
- changing number of sets
- changing rest periods
- increasing training volume
- changing intensity

The progression must be realistic and appropriate for the user's experience level.

For example:

Beginner:
- mostly moderate intensity
- 8-15 reps
- 2-4 sets
- focus on technique and consistency

Intermediate:
- 6-12 reps for main exercises
- 3-5 sets
- combination of moderate and higher intensity
- progressive overload

Advanced:
- combination of 5-12 reps
- higher training volume
- more structured intensity variation
- advanced periodization

Do NOT make every exercise 3 sets × 10 reps.

EXERCISE REQUIREMENTS:

1. Each exercise must reference a valid exerciseId.

2. The "order" field starts from 1 for every training day.

3. Sets should normally be between 2 and 5.

4. Reps should normally be between 5 and 15 depending on the exercise and goal.

5. restSeconds should normally be between 30 and 180.

6. Compound exercises can use:
- lower reps
- higher rest

7. Isolation exercises can use:
- higher reps
- shorter rest

8. Avoid excessive exercise volume.

9. Select exercises that match the workout name and target muscle groups.

10. Do not randomly mix unrelated muscle groups.

WEEK STRUCTURE:

The program should have a logical weekly structure.

Example for an intermediate user:

Day 1:
Push

Day 2:
Pull

Day 3:
Legs

Day 4:
Rest

Day 5:
Upper Body

Day 6:
Lower Body

Day 7:
Rest

Example for a beginner:

Day 1:
Full Body

Day 2:
Rest

Day 3:
Full Body

Day 4:
Rest

Day 5:
Full Body

Day 6:
Rest

Day 7:
Rest

Do NOT blindly copy these examples. Choose the most appropriate structure for the user.

RESPONSE FORMAT:

Return ONLY valid JSON.

No markdown.
No code fences.
No explanations.

The JSON must match this exact structure:

{
  "name": "string - descriptive name of the complete training program",
  "durationDays": ${durationDays},
  "days": [
    {
      "dayNumber": 1,
      "name": "Chest + Shoulders",
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
      "name": "Back + Biceps",
      "isRestDay": false,
      "exercises": []
    }
  ]
}

The final program must:
- contain exactly ${durationDays} days
- use an appropriate split
- use Full Body ONLY for beginners
- contain workout names
- contain logical muscle group distribution
- use periodization
- contain realistic sets, reps and rest
- use ONLY exercise IDs from AVAILABLE EXERCISES
`
}
