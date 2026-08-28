import { IExercise } from '@/types/exercise.types'
import { VideoOff } from 'lucide-react'

export function ExerciseCard({ exercise }: { exercise: IExercise }) {
	const hasVideo = Boolean(exercise.videoUrl)

	return (
		<div className='group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:shadow-md'>
			<div className='relative aspect-[4/3] w-full overflow-hidden bg-[#18181b]'>
				{hasVideo ? (
					<video
						src={exercise.videoUrl}
						muted
						loop
						playsInline
						preload='metadata'
						className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
						onMouseEnter={e => e.currentTarget.play()}
						onMouseLeave={e => {
							e.currentTarget.pause()
							e.currentTarget.currentTime = 0
						}}
					/>
				) : (
					<div className='flex h-full w-full flex-col items-center justify-center gap-2 bg-white/[0.03]'>
						<VideoOff className='h-6 w-6 text-white/20' strokeWidth={1.5} />
						<span className='text-[10px] font-semibold uppercase tracking-wider text-white/30'>
							No video
						</span>
					</div>
				)}

				<span
					className={`absolute right-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
						exercise.type === 'GYM'
							? 'bg-primary text-black'
							: 'bg-[#18181b] text-white'
					}`}
				>
					{exercise.type}
				</span>
			</div>

			<div className='p-4'>
				<h3 className='mb-2 text-[13px] font-bold uppercase leading-tight tracking-wide text-[#231f1f]'>
					{exercise.name}
				</h3>

				<div className='flex flex-wrap gap-1.5'>
					<span className='rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/60'>
						{exercise.muscleGroup.name}
					</span>

					<span className='rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/60'>
						{exercise.equipment.name}
					</span>
				</div>
			</div>
		</div>
	)
}
