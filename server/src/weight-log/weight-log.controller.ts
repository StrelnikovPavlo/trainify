import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { Body, Controller, Get, Post } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { CreateWeightLogDto } from './dto/create-weight-log.dto'
import { WeightLogService } from './weight-log.service'
import { ROUTES } from '@/constants/routes.constant'

@ApiBearerAuth()
@ApiTags('Weight Log')
@Controller(ROUTES.weightLog.base)
export class WeightLogController {
	constructor(private readonly weightLogService: WeightLogService) {}

	@ApiOperation({ summary: 'Log current weight' })
	@ApiCreatedResponse({ description: 'Weight entry successfully logged' })
	@Post()
	log(@CurrentUser('id') userId: string, @Body() dto: CreateWeightLogDto) {
		return this.weightLogService.log(userId, dto.weight)
	}

	@ApiOperation({ summary: 'Get latest weight entry' })
	@Get(ROUTES.weightLog.latest)
	getLatest(@CurrentUser('id') userId: string) {
		return this.weightLogService.getLatest(userId)
	}

	@ApiOperation({ summary: 'Get weight history' })
	@ApiOkResponse({ description: 'Weight history returned successfully' })
	@Get()
	getHistory(@CurrentUser('id') userId: string) {
		return this.weightLogService.getHistory(userId)
	}
}
