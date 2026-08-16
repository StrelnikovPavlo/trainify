import { ROUTES } from '@/constants/routes.constant'
import { Body, Controller, Post } from '@nestjs/common'
import { AiService } from './ai.service'

@Controller(ROUTES.ai.base)
export class AiController {
	constructor(private readonly aiService: AiService) {}

	@Post(ROUTES.ai.generate)
	async generate(@Body('prompt') prompt: string) {
		return {
			result: await this.aiService.generate(prompt)
		}
	}
}
