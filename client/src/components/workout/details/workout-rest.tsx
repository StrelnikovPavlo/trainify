export function WorkoutRest() {
	return (
		<div className='overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm'>
			<div className='bg-[#18181b] p-6 text-white sm:p-8'>
				<div className='inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70'>
					Recovery Day
				</div>

				<h2 className='mt-3 font-alumni text-[42px] font-bold uppercase leading-none sm:text-[52px]'>
					Rest & Recharge
				</h2>
			</div>

			<div className='p-6 sm:p-8'>
				<div className='rounded-[22px] bg-gray-50 p-8 text-center border border-black/5'>
					<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-black text-[24px] font-bold shadow-md shadow-primary/20'>
						✓
					</div>

					<h3 className='mt-5 text-[20px] font-bold text-black'>
						No Workouts Scheduled
					</h3>

					<p className='mx-auto mt-2 max-w-[340px] text-[13px] leading-relaxed text-black/50'>
						Take time to recover, hydrate, and get quality sleep. Your muscles
						grow during rest!
					</p>
				</div>
			</div>
		</div>
	)
}
