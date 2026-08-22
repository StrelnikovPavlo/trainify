import { Button } from '../ui/Button'

export function WeightTracker({
	weight,
	targetWeight,
}: {
	weight?: number
	targetWeight?: number
}) {
	const current = Number(weight)
	const target = Number(targetWeight)

	let progress = 0

	if (current && target) {
		progress = Math.min(100, Math.max(0, Math.round((current / target) * 100)))
	}

	return (
		<div className='rounded-[26px] border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6'>
			<div className='mb-6 flex items-center justify-between'>
				<div>
					<p className='text-[10px] font-bold uppercase tracking-[0.12em] text-black/40'>
						Body Progress
					</p>

					<h2 className='mt-0.5 text-[18px] font-bold text-black'>
						Weight Tracker
					</h2>
				</div>

				<span className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs'>
					⚖️
				</span>
			</div>

			<div className='flex items-end gap-1.5'>
				<span className='text-[48px] font-extrabold leading-none tracking-tight text-black sm:text-[52px]'>
					{weight ?? '-'}
				</span>

				<span className='mb-1.5 text-[14px] font-bold text-black/40'>kg</span>
			</div>

			<div className='mt-5 rounded-[20px] bg-gray-50 p-4 border border-black/[0.04]'>
				<div className='mb-2.5 flex justify-between text-[10px] font-extrabold uppercase tracking-wider'>
					<span className='text-black/40'>Target Goal</span>
					<span className='text-black'>
						{targetWeight ? `${targetWeight} kg` : '-'}
					</span>
				</div>

				<div className='h-2.5 overflow-hidden rounded-full bg-black/10'>
					<div
						className='h-full rounded-full bg-primary transition-all duration-500'
						style={{
							width: `${progress}%`,
						}}
					/>
				</div>
			</div>

			<div className='mt-3 grid grid-cols-2 gap-2'>
				<div className='rounded-[18px] border border-black/[0.05] bg-white p-3'>
					<p className='text-[9px] font-bold uppercase tracking-wider text-black/40'>
						Current
					</p>

					<p className='mt-1 text-[18px] font-extrabold text-black'>
						{weight ?? '-'}
						<span className='ml-1 text-[10px] font-bold text-black/40'>kg</span>
					</p>
				</div>

				<div className='rounded-[18px] border border-black/[0.05] bg-white p-3'>
					<p className='text-[9px] font-bold uppercase tracking-wider text-black/40'>
						Goal
					</p>

					<p className='mt-1 text-[18px] font-extrabold text-black'>
						{targetWeight ?? '-'}
						<span className='ml-1 text-[10px] font-bold text-black/40'>kg</span>
					</p>
				</div>
			</div>

			<Button className='mt-3.5 w-full rounded-xl bg-[#18181b] py-3 text-[12px] font-bold text-white transition hover:bg-black active:scale-[0.98]'>
				Update Weight
			</Button>
		</div>
	)
}
