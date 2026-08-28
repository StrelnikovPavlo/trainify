'use client'

interface ProfilePhysicalDataProps {
	data?: {
		age: number
		weight: number
		targetWeight: number
		height: number
		gender: string
		level: string
		goal: string
		activity: string
		workoutType: string
		bodyType: string
	}
}

export function ProfilePhysicalData({ data }: ProfilePhysicalDataProps) {
	const fields = [
		{ label: 'Age', value: data?.age ? `${data.age} years` : '—' },
		{ label: 'Weight', value: data?.weight ? `${data.weight} kg` : '—' },
		{
			label: 'Target weight',
			value: data?.targetWeight ? `${data.targetWeight} kg` : '—',
		},
		{ label: 'Height', value: data?.height ? `${data.height} cm` : '—' },
		{ label: 'Gender', value: data?.gender ?? '—' },
		{ label: 'Level', value: data?.level ?? '—' },
		{ label: 'Goal', value: data?.goal ?? '—' },
		{ label: 'Activity', value: data?.activity ?? '—' },
		{ label: 'Workout type', value: data?.workoutType ?? '—' },
		{ label: 'Body type', value: data?.bodyType ?? '—' },
	]

	return (
		<section className='mt-6 rounded-[24px] border border-black/[0.06] bg-white p-5 shadow-sm'>
			<p className='text-[9px] font-extrabold uppercase tracking-[0.12em] text-black/40'>
				Physical data
			</p>

			<div className='mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3'>
				{fields.map(field => (
					<div key={field.label}>
						<p className='text-[10px] font-bold uppercase tracking-wide text-black/40'>
							{field.label}
						</p>
						<p className='mt-0.5 text-[14px] font-bold'>{field.value}</p>
					</div>
				))}
			</div>
		</section>
	)
}
