interface IMealPlanItemProps {
	title: string
	fileSize: string
	description: string
	fileUrl: string
}

export function MealPlanItem({
	title,
	fileSize,
	description,
	fileUrl,
}: IMealPlanItemProps) {
	return (
		<div className='flex flex-col justify-between gap-4 rounded-[26px] border border-black/[0.06] bg-white p-5 shadow-sm transition-all duration-200 hover:border-black/20 hover:shadow-md sm:flex-row sm:items-center sm:p-6'>
			<div className='flex items-start gap-4 min-w-0'>
				<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-200/60 bg-red-50 font-alumni text-[16px] font-bold tracking-wider text-red-500 shadow-sm'>
					PDF
				</div>

				<div className='min-w-0 pr-2'>
					<div className='flex flex-wrap items-center gap-2'>
						<h3 className='truncate text-[16px] font-bold text-[#18181b] sm:text-[17px]'>
							{title}
						</h3>

						<span className='rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-black/40'>
							{fileSize}
						</span>
					</div>

					<p className='mt-1 text-[12px] font-medium leading-relaxed text-black/50 line-clamp-2'>
						{description}
					</p>
				</div>
			</div>

			<div className='flex items-center gap-2.5 border-t border-black/[0.04] pt-3 shrink-0 sm:border-0 sm:pt-0'>
				<a
					href={fileUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex flex-1 items-center justify-center rounded-xl border border-black/[0.06] bg-gray-50 px-4 py-2.5 text-[12px] font-bold text-black transition hover:bg-black hover:text-white active:scale-95 sm:flex-none'
				>
					View
				</a>

				<a
					href={fileUrl}
					download
					className='inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-wider text-black shadow-sm shadow-primary/20 transition hover:scale-[1.02] active:scale-95 sm:flex-none'
				>
					Download ↓
				</a>
			</div>
		</div>
	)
}
