'use client'

interface DeleteAccountButtonProps {
	onDelete: () => Promise<void>
	isDeleting: boolean
}

export function DeleteAccountButton({
	onDelete,
	isDeleting,
}: DeleteAccountButtonProps) {
	const handleClick = () => {
		if (confirm('Delete your account? This cannot be undone.')) {
			onDelete()
		}
	}

	return (
		<button
			onClick={handleClick}
			disabled={isDeleting}
			className='mt-6 w-full rounded-2xl border border-red-500/20 py-3 text-[11px] font-black uppercase tracking-wide text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50'
		>
			{isDeleting ? 'Deleting...' : 'Delete account'}
		</button>
	)
}
