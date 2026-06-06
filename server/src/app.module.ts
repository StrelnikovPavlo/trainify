import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [`.${process.env.NODE_ENV}.env`],
			cache: true, // only production
			isGlobal: true
		}),
		UsersModule
	],
	controllers: []
})
export class AppModule {}
