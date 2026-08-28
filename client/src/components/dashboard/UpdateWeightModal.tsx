'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'

interface UpdateWeightModalProps {
	isOpen: boolean
	currentWeight?: number
	onClose: () => void
	onSubmit: (weight: number) => Promise<unknown>
	isSaving: boolean
}

export function UpdateWeightModal({
	isOpen,
	currentWeight,
	onClose,
	onSubmit,
	isSaving,
}: UpdateWeightModalProps) {
	const [value, setValue] = useState(String(currentWeight ?? ''))

	if (!isOpen) return null

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const weight = Number(value)
		if (!weight || weight <= 0) return

		await onSubmit(weight)
		onClose()
	}

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/50 px-4'>
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-[340px] rounded-[28px] bg-white p-6'
			>
				<h2 className='font-alumni text-3xl font-bold uppercase leading-none'>
					Update weight
				</h2>

				<input
					type='number'
					step='0.1'
					value={value}
					onChange={e => setValue(e.target.value)}
					autoFocus
					className='mt-5 h-[54px] w-full rounded-[16px] border border-black/[0.08] px-4 text-[16px] outline-none focus:border-black/25'
					placeholder='kg'
				/>

				<div className='mt-5 flex gap-2'>
					<Button
						type='submit'
						disabled={isSaving}
						className='btn btn-black flex-1 py-3 text-[12px] font-black uppercase tracking-wide disabled:opacity-50'
					>
						{isSaving ? 'Saving...' : 'Save'}
					</Button>
					<Button
						type='button'
						onClick={onClose}
						className='flex-1 rounded-2xl border border-black/[0.08] py-3 text-[12px] font-bold uppercase tracking-wide text-black/50'
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	)
}
