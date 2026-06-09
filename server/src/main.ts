import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const PORT = process.env.PORT || 5100
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	const config = new DocumentBuilder()
		.setTitle('Trainify API')
		.setVersion('1.0')
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api/docs', app, documentFactory)

	await app.listen(PORT, () =>
		console.log(`Server started on port ${process.env.PORT}`)
	)
}

void bootstrap()
