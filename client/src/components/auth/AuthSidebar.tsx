export function AuthSidebar() {
	return (
		<div className='relative hidden overflow-hidden bg-[#231f1f] p-10 lg:flex lg:flex-col lg:justify-between'>
			<div className='relative z-10'>
				<span className='font-alumni text-[36px] font-bold tracking-[-0.03em] text-white'>
					Trainify<span className='text-primary'>.</span>
				</span>
			</div>

			<div className='relative z-10 max-w-[520px]'>
				<div className='mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50'>
					Your training journey
				</div>

				<h2 className='font-alumni text-[72px] font-bold uppercase leading-[0.85] tracking-[-0.03em] text-white xl:text-[86px]'>
					Build.
					<br />
					Train.
					<br />
					<span className='text-primary'>Become.</span>
				</h2>

				<p className='mt-7 max-w-[380px] text-[14px] leading-relaxed text-white/40'>
					Personalized workouts, progress tracking and everything you need to
					become stronger.
				</p>
			</div>

			<div className='relative z-10'>
				<p className='text-[11px] font-medium text-white/25'>
					Train smarter. Get stronger.
				</p>
			</div>

			<div className='absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full border-[70px] border-white/[0.03]' />
			<div className='absolute -right-20 top-20 h-[300px] w-[300px] rounded-full border-[50px] border-primary/[0.04]' />
		</div>
	)
}
