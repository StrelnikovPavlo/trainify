'use client'

import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { useEffect, useRef, useState } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const setAccessToken = useAuthStore(state => state.setAccessToken)
	const [isReady, setIsReady] = useState(false)
	const isCalled = useRef(false)

	useEffect(() => {
		if (isCalled.current) return
		isCalled.current = true

		authService
			.refresh()
			.then(({ accessToken }) => setAccessToken(accessToken))
			.catch(() => setAccessToken(null))
			.finally(() => setIsReady(true))
	}, [])

	if (!isReady) return null

	return <>{children}</>
}
