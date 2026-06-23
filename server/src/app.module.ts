import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { RolesGuard } from './auth/guards/roles.guard'

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
	controllers: [],
	providers: [
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RolesGuard }
	]
})
export class AppModule {}
