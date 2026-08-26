'use client'

import { DeleteAccountButton } from '@/components/profile/DeleteAccountButton'
import { ProfileDetailsCard } from '@/components/profile/ProfileDetailsCard'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { useProfile } from '@/hooks/useProfile'
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'

export default function Profile() {
	const {
		user,
		isLoading,
		updateProfile,
		isUpdating,
		updateError,
		deleteAccount,
		isDeleting,
	} = useProfile()
	const { push } = useRouter()

	const handleLogout = async () => {
		await authService.logout()
		push('/auth')
	}

	const handleDelete = async () => {
		await deleteAccount()
		push('/auth')
	}

	if (isLoading) {
		return (
			<div className='flex min-h-[400px] items-center justify-center text-sm font-bold uppercase tracking-wider text-black/40'>
				Loading profile...
			</div>
		)
	}

	return (
		<div className='mx-auto max-w-[800px] px-4 py-6 sm:px-0 sm:py-10'>
			<ProfileHeader user={user} onLogout={handleLogout} />

			<ProfileDetailsCard
				user={user}
				onSave={updateProfile}
				isSaving={isUpdating}
				saveError={updateError}
			/>

			<DeleteAccountButton onDelete={handleDelete} isDeleting={isDeleting} />
		</div>
	)
}
