import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [`.${process.env.NODE_ENV}.env`],
			cache: true, // only production
			isGlobal: true
		}),
		UsersModule,
		AuthModule
	],
	controllers: []
})
export class AppModule {}
