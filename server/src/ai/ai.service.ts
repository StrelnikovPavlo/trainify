import { GoogleGenAI } from '@google/genai'
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AiService {
	private readonly ai: GoogleGenAI
	private readonly model: string
	private readonly logger = new Logger(AiService.name)
	private readonly MAX_RETRIES = 3

	constructor(private readonly configService: ConfigService) {
		this.ai = new GoogleGenAI({
			apiKey: this.configService.getOrThrow('GEMINI_API_KEY')
		})
		this.model = this.configService.get<string>(
			'GEMINI_MODEL',
			'gemini-2.0-flash'
		)
	}

	async generate(prompt: string): Promise<string> {
		for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
			try {
				const res = await this.ai.models.generateContent({
					model: this.model,
					contents: prompt
				})
				return res.text ?? ''
			} catch (error) {
				this.logger.warn(`AI attempt ${attempt} failed`, error)

				const isLast = attempt === this.MAX_RETRIES
				const isRetryable = this.isRetryableError(error)

				if (isLast || !isRetryable) {
					throw new ServiceUnavailableException(
						'AI service is temporarily unavailable. Please try again later.'
					)
				}

				await this.sleep(1000 * 2 ** (attempt - 1))
			}
		}

		throw new ServiceUnavailableException('Unexpected error')
	}

	private isRetryableError(error: unknown): boolean {
		if (error && typeof error === 'object' && 'status' in error) {
			const status = (error as { status?: number }).status
			return status === 503 || status === 429
		}
		return false
	}

	private sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
}
