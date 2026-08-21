import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { RolesGuard } from './auth/guards/roles.guard'
import { UserProfileModule } from './user-profile/user-profile.module'
import { UsersModule } from './users/users.module'
import { AiModule } from './ai/ai.module';
import { TrainingPlanModule } from './training-plan/training-plan.module';
import { ExercisesModule } from './exercises/exercises.module';
import { MuscleGroupModule } from './muscle-group/muscle-group.module';
import { EquipmentModule } from './equipment/equipment.module';
import { WorkoutSessionModule } from './workout-session/workout-session.module';
import { WorkoutLogModule } from './workout-log/workout-log.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [`.${process.env.NODE_ENV}.env`],
			cache: true, // only production
			isGlobal: true
		}),
		UsersModule,
		AuthModule,
		UserProfileModule,
		AiModule,
		TrainingPlanModule,
		ExercisesModule,
		MuscleGroupModule,
		EquipmentModule,
		WorkoutSessionModule,
		WorkoutLogModule
	],
	controllers: [],
	providers: [
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RolesGuard }
	]
})
export class AppModule {}
