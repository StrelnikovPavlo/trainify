import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma, User } from 'prisma/generated/prisma/client'

type SafeUser = Omit<User, 'password'>

@Injectable()
export class UserRepository {
	constructor(private readonly prismaServices: PrismaService) {}

	count(): Promise<number> {
		return this.prismaServices.user.count()
	}

	create(data: Prisma.UserCreateInput): Promise<SafeUser> {
		return this.prismaServices.user.create({
			data,
			omit: { password: true }
		})
	}

	findByEmail(email: string): Promise<SafeUser | null> {
		return this.prismaServices.user.findUnique({
			where: { email }
		})
	}

	findById(id: string): Promise<SafeUser | null> {
		return this.prismaServices.user.findUnique({
			where: { id },
			omit: { password: true }
		})
	}

	findMany(): Promise<SafeUser[]> {
		return this.prismaServices.user.findMany({
			omit: { password: true }
		})
	}

	update(id: string, data: Prisma.UserUpdateInput): Promise<SafeUser> {
		return this.prismaServices.user.update({
			where: { id },
			data,
			omit: { password: true }
		})
	}

	delete(id: string): Promise<SafeUser> {
		return this.prismaServices.user.delete({
			where: { id }
		})
	}
}
