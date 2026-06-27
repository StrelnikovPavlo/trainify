import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Role } from 'prisma/generated/prisma/enums'
import { ROLES_KEY } from '../decorators/roles.decorator'

interface AuthenticatedRequest extends Request {
	user: {
		id: string
		email: string
		role: Role
	}
}

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!requiredRoles || requiredRoles.length === 0) {
			return true
		}

		const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>()

		if (!user) {
			throw new ForbiddenException('Access denied')
		}

		const hasRole = requiredRoles.includes(user.role)

		if (!hasRole) {
			throw new ForbiddenException(
				`Access denied. Required roles: ${requiredRoles.join(', ')}`
			)
		}

		return true
	}
}
