import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserProfileDto } from './dto/create-profile.dto'
import { UserProfileRepository } from './user-profile.repository'

@Injectable()
export class UserProfileService {
	constructor(private readonly userProfileRepository: UserProfileRepository) {}

	async create(userId: string, dto: UserProfileDto) {
		const exist = await this.userProfileRepository.findById(userId)
		if (exist) {
			throw new ConflictException('Profile already exists')
		}

		return this.userProfileRepository.create(userId, dto)
	}

	async findByUserId(userId: string) {
		const profile = await this.userProfileRepository.findById(userId)
		if (!profile) {
			throw new NotFoundException('Profile not found')
		}

		return profile
	}
}
