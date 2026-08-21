import { GoogleGenAI } from '@google/genai'
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AiService {
	private readonly ai: GoogleGenAI
	private readonly model: string
	private readonly fallbackModel = 'gemini-3.6-flash'
	private readonly logger = new Logger(AiService.name)

	private readonly MAX_RETRIES = 3

	constructor(private readonly configService: ConfigService) {
		this.ai = new GoogleGenAI({
			apiKey: this.configService.getOrThrow<string>('GEMINI_API_KEY')
		})

		this.model = this.configService.get<string>(
			'GEMINI_MODEL',
			'gemini-3.7-flash'
		)
	}

	async generate(prompt: string): Promise<string> {
		try {
			return await this.generateWithRetry(this.model, prompt)
		} catch (error) {
			if (!this.isRetryableError(error)) {
				this.logger.error('AI request failed', error)

				throw new ServiceUnavailableException(
					'AI service is temporarily unavailable.'
				)
			}

			this.logger.warn(
				`Primary model ${this.model} failed. Trying fallback model ${this.fallbackModel}`
			)
		}

		try {
			return await this.generateWithRetry(this.fallbackModel, prompt)
		} catch (error) {
			this.logger.error(`Fallback model ${this.fallbackModel} failed`, error)

			throw new ServiceUnavailableException(
				'AI service is temporarily unavailable. Please try again later.'
			)
		}
	}

	private async generateWithRetry(
		model: string,
		prompt: string
	): Promise<string> {
		for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
			try {
				this.logger.log(
					`AI request: model=${model}, attempt=${attempt}/${this.MAX_RETRIES}`
				)

				const response = await this.ai.models.generateContent({
					model,
					contents: prompt
				})

				const text = response.text?.trim()

				if (!text) {
					throw new Error('AI returned an empty response')
				}

				return text
			} catch (error) {
				const retryable = this.isRetryableError(error)
				const lastAttempt = attempt === this.MAX_RETRIES

				this.logger.warn(
					`AI request failed: model=${model}, attempt=${attempt}, retryable=${retryable}`
				)

				if (!retryable || lastAttempt) {
					throw error
				}

				const delay = this.getRetryDelay(attempt)

				this.logger.warn(`Retrying AI request in ${delay}ms`)

				await this.sleep(delay)
			}
		}

		throw new Error('AI request failed unexpectedly')
	}

	private isRetryableError(error: unknown): boolean {
		if (!error || typeof error !== 'object') {
			return false
		}

		if (!('status' in error)) {
			return false
		}

		const status = (error as { status?: number }).status

		return status === 429 || status === 500 || status === 502 || status === 503
	}

	private getRetryDelay(attempt: number): number {
		const baseDelay = 2000
		const maxDelay = 10000

		return Math.min(baseDelay * 2 ** (attempt - 1), maxDelay)
	}

	private sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
}
