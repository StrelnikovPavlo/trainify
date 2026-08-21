import Link from 'next/link'
import { Button } from '../ui/Button'

export function WorkoutHero({ day, dayIndex }: { day: any; dayIndex: number }) {
	const exercises = day?.exercises ?? []

	const totalSets = exercises.reduce(
		(total: number, exercise: any) => total + (exercise.sets ?? 0),
		0,
	)

	const totalReps = exercises.reduce(
		(total: number, exercise: any) =>
			total + (exercise.sets ?? 0) * (exercise.reps ?? 0),
		0,
	)

	return (
		<>
			<p className='mt-6 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/40 sm:mt-8'>
				Training session
			</p>

			<h2 className='mt-1 font-alumni text-[48px] font-bold uppercase leading-[0.9] tracking-tight sm:text-[62px]'>
				Workout {dayIndex + 1}
			</h2>

			<p className='mt-3 max-w-[420px] text-[13px] leading-relaxed text-white/50 sm:text-[14px]'>
				Your planned session for today. Stay focused, track your reps and push
				through.
			</p>

			<div className='mt-6 flex flex-wrap gap-2'>
				<div className='rounded-xl bg-white/10 px-3.5 py-1.5 text-[11px] font-bold text-white/80 backdrop-blur-sm'>
					{exercises.length} exercises
				</div>
				<div className='rounded-xl bg-white/10 px-3.5 py-1.5 text-[11px] font-bold text-white/80 backdrop-blur-sm'>
					{totalSets} sets
				</div>
				<div className='rounded-xl bg-white/10 px-3.5 py-1.5 text-[11px] font-bold text-white/80 backdrop-blur-sm'>
					{totalReps} reps
				</div>
			</div>

			<Link
				href={`/dashboard/workouts/${dayIndex + 1}`}
				className='mt-7 block w-full sm:inline-block sm:w-auto'
			>
				<Button className='btn-yellow w-full justify-center px-8 py-3.5 text-[13px] font-black uppercase tracking-wider text-black transition hover:scale-[1.02] sm:w-auto'>
					Start workout →
				</Button>
			</Link>
		</>
	)
}
