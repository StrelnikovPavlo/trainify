'use client'

interface MealPdf {
	id: string
	title: string
	description: string
	fileUrl: string
	fileSize: string
	updatedAt: string
}

// Замініть посилання у fileUrl на ваші реальні шляхи до PDF-файлів
const MEAL_PDFS: MealPdf[] = [
	{
		id: '1',
		title: 'Weekly Meal Plan',
		description:
			'Повний раціон харчування на поточний тиждень з розрахованими КБЖВ.',
		fileUrl: '/documents/weekly-meal-plan.pdf',
		fileSize: '2.4 MB',
		updatedAt: 'Aug 2026',
	},
	{
		id: '2',
		title: 'Nutrition & Recipe Guide',
		description:
			'Керівництво з приготування страв, варіанти заміни продуктів та рекомендації.',
		fileUrl: '/documents/nutrition-guide.pdf',
		fileSize: '4.1 MB',
		updatedAt: 'Aug 2026',
	},
	{
		id: '3',
		title: 'Grocery Shopping List',
		description:
			'Зручний список закупу необхідних продуктів для вашого раціону.',
		fileUrl: '/documents/shopping-list.pdf',
		fileSize: '1.2 MB',
		updatedAt: 'Aug 2026',
	},
]

export default function Meal() {
	return (
		<div className='mx-auto max-w-[800px] px-4 py-8 sm:px-0 sm:py-12'>
			{/* Header */}
			<header className='mb-8 mt-4'>
				<p className='mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-black/40 sm:text-[12px]'>
					Nutrition & Diets
				</p>

				<h1 className='font-alumni text-[42px] font-bold uppercase leading-none tracking-tight text-[#18181b] sm:text-[56px]'>
					Meal Plan
				</h1>

				<p className='mt-2 text-[13px] font-medium text-black/40 sm:text-[14px]'>
					Переглядайте онлайн або завантажуйте персональні файли харчування у
					форматі PDF.
				</p>
			</header>

			{/* List of PDFs */}
			<div className='space-y-4'>
				{MEAL_PDFS.map(pdf => (
					<div
						key={pdf.id}
						className='flex flex-col justify-between gap-4 rounded-[26px] border border-black/[0.06] bg-white p-5 shadow-sm transition-all duration-200 hover:border-black/20 hover:shadow-md sm:flex-row sm:items-center sm:p-6'
					>
						{/* PDF Details */}
						<div className='flex items-start gap-4 min-w-0'>
							<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-200/60 bg-red-50 font-alumni text-[16px] font-bold tracking-wider text-red-500 shadow-sm'>
								PDF
							</div>

							<div className='min-w-0 pr-2'>
								<div className='flex flex-wrap items-center gap-2'>
									<h3 className='truncate text-[16px] font-bold text-[#18181b] sm:text-[17px]'>
										{pdf.title}
									</h3>

									<span className='rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-black/40'>
										{pdf.fileSize}
									</span>
								</div>

								<p className='mt-1 text-[12px] font-medium leading-relaxed text-black/50 line-clamp-2'>
									{pdf.description}
								</p>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex items-center gap-2.5 border-t border-black/[0.04] pt-3 shrink-0 sm:border-0 sm:pt-0'>
							{/* Перегляд у новій вкладці */}
							<a
								href={pdf.fileUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex flex-1 items-center justify-center rounded-xl border border-black/[0.06] bg-gray-50 px-4 py-2.5 text-[12px] font-bold text-black transition hover:bg-black hover:text-white active:scale-95 sm:flex-none'
							>
								Переглянути
							</a>

							{/* Скачування */}
							<a
								href={pdf.fileUrl}
								download
								className='inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-wider text-black shadow-sm shadow-primary/20 transition hover:scale-[1.02] active:scale-95 sm:flex-none'
							>
								Скачати ↓
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
