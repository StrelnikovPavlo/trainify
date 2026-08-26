interface MealPdf {
	id: string
	title: string
	description: string
	fileUrl: string
	fileSize: string
	updatedAt: string
}

export const MEAL_PDFS: MealPdf[] = [
	{
		id: '1',
		title: '1600-1800 KCAL',
		description:
			'Complete meal plan for the current week with calculated calories and macronutrients.',
		fileUrl: '/pdf/Trainify_1600-1800.pdf',
		fileSize: '2.4 KB',
		updatedAt: 'Aug 2026',
	},
]
