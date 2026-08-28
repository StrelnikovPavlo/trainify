'use client'

import { AuthContent } from '@/components/auth/AuthContent'
import { AuthSidebar } from '@/components/auth/AuthSidebar'

export function Auth() {
	return (
		<div className='min-h-screen bg-[#f6f6f6] lg:grid lg:grid-cols-2'>
			<AuthSidebar />
			<AuthContent />
		</div>
	)
}
