import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateWeightLogDto } from './dto/create-weight-log.dto'
import { WeightLogService } from './weight-log.service'

@ApiBearerAuth()
@ApiTags('Weight Log')
@Controller('weight-log')
export class WeightLogController {
	constructor(private readonly weightLogService: WeightLogService) {}

	@ApiOperation({ summary: 'Log current weight' })
	@Post()
	log(@CurrentUser('id') userId: string, @Body() dto: CreateWeightLogDto) {
		return this.weightLogService.log(userId, dto.weight)
	}

	@ApiOperation({ summary: 'Get latest weight entry' })
	@Get('latest')
	getLatest(@CurrentUser('id') userId: string) {
		return this.weightLogService.getLatest(userId)
	}

	@ApiOperation({ summary: 'Get weight history' })
	@Get()
	getHistory(@CurrentUser('id') userId: string) {
		return this.weightLogService.getHistory(userId)
	}
}
