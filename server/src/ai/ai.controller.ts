import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Post } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { AiService } from './ai.service'

@ApiBearerAuth()
@ApiTags('Ai')
@Controller(ROUTES.ai.base)
export class AiController {
	constructor(private readonly aiService: AiService) {}

	@ApiOperation({
		summary: 'Generate AI response'
	})
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				prompt: {
					type: 'string',
					example: 'Leg workout, one day'
				}
			},
			required: ['prompt']
		}
	})
	@ApiOkResponse({ description: 'AI response generated successfully' })
	@Post(ROUTES.ai.generate)
	async generate(@Body('prompt') prompt: string) {
		return {
			result: await this.aiService.generate(prompt)
		}
	}
}
