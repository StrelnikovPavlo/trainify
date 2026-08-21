import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { UserProfileDto } from './dto/create-profile.dto'

@Injectable()
export class UserProfileRepository {
	constructor(private readonly prismaService: PrismaService) {}

	create(userId: string, data: UserProfileDto) {
		return this.prismaService.userProfile.create({
			data: {
				...data,
				user: {
					connect: { id: userId }
				}
			}
		})
	}

	findById(userId: string) {
		return this.prismaService.userProfile.findUnique({
			where: { userId },
			include: {
				user: {
					select: {
						username: true,
						surname: true,
						email: true
					}
				}
			}
		})
	}
}
