export const ROUTES = {
	auth: {
		base: 'auth',
		register: '/register',
		login: '/login',
		logout: '/logout',
		refresh: '/refresh'
	},
	ai: {
		base: 'ai',
		generate: 'generate'
	},
	equipment: {
		base: 'equipment',
		byId: ':id'
	},
	exercises: {
		base: 'exercises',
		byId: ':id'
	},
	muscleGroup: {
		base: 'muscle-group',
		byId: ':id'
	},
	trainingPlan: {
		base: 'training-plan',
		generate: 'generate',
		me: 'me'
	},
	userProfile: {
		base: 'user-profile',
		me: 'me'
	},
	users: {
		base: 'users',
		byId: ':id'
	}
} as const
