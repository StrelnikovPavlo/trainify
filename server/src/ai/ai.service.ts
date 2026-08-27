import { GoogleGenAI } from '@google/genai'
import {
	Injectable,
	InternalServerErrorException,
	Logger,
	ServiceUnavailableException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AiService {
	RETRIES = 3
	DELAY_MS = 1000

	private readonly logger = new Logger(AiService.name)
	private readonly ai: GoogleGenAI
	private readonly model: string
	private readonly fallbackModel = 'gemini-3.5-flash-lite'

	constructor(private readonly configService: ConfigService) {
		this.ai = new GoogleGenAI({
			apiKey: this.configService.getOrThrow<string>('GEMINI_API_KEY')
		})

		this.model = this.configService.get<string>(
			'GEMINI_MODEL',
			'gemini-3.6-flash'
		)
	}

	async generate(prompt: string): Promise<string> {
		for (let attempt = 0; attempt <= this.RETRIES; attempt++) {
			const model = attempt < this.RETRIES ? this.model : this.fallbackModel

			try {
				return await this.generateContent(prompt, model)
			} catch (error) {
				const status = this.statusKod(error)
				const isRetryable = status === 429 || status === 503
				const isLastAttempt = attempt === this.RETRIES

				if (!isRetryable || isLastAttempt) {
					this.logger.error(this.getErrorMessage(error))

					throw status === 429
						? new ServiceUnavailableException(
								'AI service is overloaded, please try again later'
							)
						: new InternalServerErrorException(
								'Failed to generate a response from AI'
							)
				}

				await this.sleep(this.DELAY_MS * 2 ** attempt)
			}
		}
		throw new InternalServerErrorException(
			'Failed to generate a response from AI'
		)
	}

	private async generateContent(
		prompt: string,
		model: string
	): Promise<string> {
		const res = await this.ai.models.generateContent({
			model,
			contents: prompt
		})

		return res.text?.trim() ?? ' '
	}

	private statusKod(error: unknown): number | undefined {
		if (typeof error === 'object' && error !== null) {
			const err = error as { status?: number; code?: number }
			return err.status ?? err.code
		}
		return undefined
	}

	private getErrorMessage(error: unknown): string {
		return error instanceof Error ? error.message : String(error)
	}

	private sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
}
