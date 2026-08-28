import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const PORT = process.env.PORT || 5100
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors({
		origin: process.env.CLIENT_URL,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE']
	})

	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())

	const config = new DocumentBuilder()
		.addBearerAuth()
		.addGlobalResponse({
			status: 500,
			description: 'Internal server error'
		})
		.setTitle('Trainify API')
		.setDescription('Applications for organization ang generation trainings')
		.setVersion('1.0')
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api/docs', app, documentFactory)

	await app.listen(PORT, () =>
		console.log(
			`Server started on port ${process.env.PORT}, http://localhost:${process.env.PORT}`
		)
	)
}

void bootstrap()
