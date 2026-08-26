'use client'

import { MealPlanItem } from '@/components/MealPlanItem'
import { MEAL_PDFS } from '@/constants/meal-plan'

export default function MealPlan() {
	return (
		<div className='mx-auto max-w-[800px] px-4 py-8 sm:px-0 sm:py-12'>
			<header className='mb-8 mt-4'>
				<p className='mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-black/40 sm:text-[12px]'>
					Nutrition & Diets
				</p>

				<h1 className='font-alumni text-[42px] font-bold uppercase leading-none tracking-tight text-[#18181b] sm:text-[56px]'>
					Meal Plan
				</h1>

				<p className='mt-2 text-[13px] font-medium text-black/40 sm:text-[14px]'>
					View online or download your personalized meal plan PDF files.
				</p>
			</header>

			<div className='space-y-4'>
				{MEAL_PDFS.map(pdf => (
					<MealPlanItem
						key={pdf.id}
						title={pdf.title}
						fileSize={pdf.fileSize}
						description={pdf.description}
						fileUrl={pdf.fileUrl}
					/>
				))}
			</div>
		</div>
	)
}
