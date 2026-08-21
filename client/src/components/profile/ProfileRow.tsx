import { EditIcon } from '../icons/EditIcon'

type ProfileRowProps = {
	label: string
	value?: string
	last?: boolean
}

export function ProfileRow({ label, value, last }: ProfileRowProps) {
	return (
		<div
			className={`
				flex items-center justify-between gap-5 py-5
				${!last ? 'border-b border-black/[0.06]' : ''}
			`}
		>
			<div className='min-w-0'>
				<p className='text-[11px] font-semibold uppercase tracking-wide text-black/35'>
					{label}
				</p>

				<p className='mt-1 truncate text-[14px] font-semibold text-[#231f1f]'>
					{value || '—'}
				</p>
			</div>

			<button className='flex shrink-0 items-center gap-2 rounded-full px-3 py-2 font-alumni text-[16px] font-bold uppercase text-[#231f1f] transition-all hover:bg-[#f6f6f6]'>
				<EditIcon />
				Edit
			</button>
		</div>
	)
}
