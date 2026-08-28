import { Metadata } from 'next'
import Dashboard from './Dashboard'

export const metadata: Metadata = {
	title: 'Dashboard | Trainify platform',
}

export default function DashboardPage() {
	return <Dashboard />
}
