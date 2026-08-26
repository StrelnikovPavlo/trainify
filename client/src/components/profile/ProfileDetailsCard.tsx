'use client'

import { IUpdateUser, IUser } from '@/types/profile.types'
import { useState } from 'react'
import { EditProfileForm } from './EditProfileForm'

interface ProfileDetailsCardProps {
	user?: IUser
	onSave: (dto: IUpdateUser) => Promise<unknown>
	isSaving: boolean
	saveError: unknown
}

export function ProfileDetailsCard({
	user,
	onSave,
	isSaving,
	saveError,
}: ProfileDetailsCardProps) {
	const [isEditing, setIsEditing] = useState(false)

	const handleSave = async (dto: IUpdateUser) => {
		await onSave(dto)
		setIsEditing(false)
	}

	return (
		<section className='mt-6 rounded-[24px] border border-black/[0.06] bg-white p-5 shadow-sm'>
			{isEditing ? (
				<EditProfileForm
					user={user}
					onSave={handleSave}
					onCancel={() => setIsEditing(false)}
					isSaving={isSaving}
					error={saveError}
				/>
			) : (
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-[9px] font-extrabold uppercase tracking-[0.12em] text-black/40'>
							Account details
						</p>
						<p className='mt-1 text-[15px] font-bold'>
							{user?.username} {user?.surname}
						</p>
						<p className='text-[13px] text-black/40'>{user?.email}</p>
					</div>

					<button
						onClick={() => setIsEditing(true)}
						className='text-[11px] font-bold uppercase tracking-wide text-black/50 hover:text-black'
					>
						Edit →
					</button>
				</div>
			)}
		</section>
	)
}
