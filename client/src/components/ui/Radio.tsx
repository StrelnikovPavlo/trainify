'use client'

import clsx from 'clsx'

interface IRadioProps {
	value: string
	title: string
	description?: string
	checked: boolean
	onChange: (value: string) => void
	className?: string
}

export default function Radio({ value,title,description,checked,onChange,className }: IRadioProps) {
	return (
		<label className={clsx('radio', checked ? 'radio--checked' : 'radio--unchecked', className)}>
			<input type='radio' className='hidden' checked={checked} onChange={() => onChange(value)} />
			<div className='text-left'>
				<div className='font-semibold'>{title}</div>
				{description && ( <p className='mt-1 text-[12px] text-gray'>{description}</p> )}
			</div>
			<div className={clsx( 'flex h-6 w-6 items-center justify-center rounded-md border transition-all', checked ? 'border-black' : 'border-neutral-300',)}>
				{checked && <div className='h-5 w-5 rounded-sm bg-black' />}
			</div>
		</label>
	)
}
