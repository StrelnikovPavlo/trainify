import { GoogleGenAI } from '@google/genai'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AiService {
	private readonly ai: GoogleGenAI

	constructor(private readonly configService: ConfigService) {
		this.ai = new GoogleGenAI({
			apiKey: this.configService.getOrThrow('GEMINI_API_KEY')
		})
	}

	async generate(prompt: string): Promise<string> {
		const res = await this.ai.models.generateContent({
			model: 'gemini-2.0-flash',
			contents: prompt
		})

		return res.text ?? ''
	}
}
