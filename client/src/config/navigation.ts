import { DASHBOARD_PAGES } from './pages-url.config'

export const NAVIGATION = [
	{
		url: DASHBOARD_PAGES.HOME,
		value: 'Home',
	},
	{
		url: DASHBOARD_PAGES.WORKOUTS,
		value: 'Workouts',
	},
	{
		url: DASHBOARD_PAGES.MEAL,
		value: 'Meal Plan',
	},
] as const
