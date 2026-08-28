import { QueryProvider } from '@/providers/query-provider'
import type { Metadata } from 'next'
import { Alumni_Sans, Manrope } from 'next/font/google'
import './global.css'
import { AuthProvider } from '@/providers/AuthProvider'

const manrope = Manrope({
	subsets: ['latin'],
	weight: ['500', '600', '700', '800'],
	display: 'swap',
	variable: '--font-manrope',
})

export const alumniSans = Alumni_Sans({
	subsets: ['latin'],
	weight: ['700'],
	display: 'swap',
	variable: '--font-alumniSans',
})

export const metadata: Metadata = {
	title: 'Trainify app',
	description: 'App for organization and generation training plans',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={`${manrope.variable} ${alumniSans.variable}`}>
			<body className='min-h-full flex flex-col'>
				<QueryProvider>
					<AuthProvider>{children}</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
