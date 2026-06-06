-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Activity" AS ENUM ('PASSIVE', 'LIGHTACTIVE', 'MODERATELYACTIVE', 'VERYACTIVE', 'SUPERACTIVE');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('GYM', 'HOME');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('ECTOMORPH', 'MESOMORPH', 'ENDOMORPH');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('MASS', 'MOBILITY', 'FAT_LOSS');

-- CreateEnum
CREATE TYPE "TrainingDayStatus" AS ENUM ('PLANNED', 'COMPLETED', 'SKIPPED');

-- CreateTable
CREATE TABLE "exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "muscle_group" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_log" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "completed_sets" INTEGER NOT NULL,
    "completed_reps" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weight_log" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "logged_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weight_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_plan" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_day" (
    "id" TEXT NOT NULL,
    "training_plan_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "is_rest_day" BOOLEAN NOT NULL DEFAULT false,
    "status" "TrainingDayStatus" NOT NULL DEFAULT 'PLANNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_day_exercise" (
    "id" TEXT NOT NULL,
    "training_day_id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "rest_seconds" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "training_day_exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_day_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "workout_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "target_weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "gender" "Gender" NOT NULL,
    "level" "Level" NOT NULL,
    "goal" "Goal" NOT NULL,
    "activity" "Activity" NOT NULL,
    "workout_type" "WorkoutType" NOT NULL,
    "body_type" "BodyType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercise_name_key" ON "exercise"("name");

-- CreateIndex
CREATE INDEX "weight_log_user_id_logged_at_idx" ON "weight_log"("user_id", "logged_at");

-- CreateIndex
CREATE INDEX "training_day_date_idx" ON "training_day"("date");

-- CreateIndex
CREATE UNIQUE INDEX "training_day_training_plan_id_date_key" ON "training_day"("training_plan_id", "date");

-- CreateIndex
CREATE INDEX "training_day_exercise_training_day_id_idx" ON "training_day_exercise"("training_day_id");

-- CreateIndex
CREATE INDEX "workout_session_user_id_training_day_id_idx" ON "workout_session"("user_id", "training_day_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_userId_key" ON "user_profile"("userId");

-- AddForeignKey
ALTER TABLE "workout_log" ADD CONSTRAINT "workout_log_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "workout_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_log" ADD CONSTRAINT "workout_log_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_log" ADD CONSTRAINT "weight_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_plan" ADD CONSTRAINT "training_plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_day" ADD CONSTRAINT "training_day_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_day_exercise" ADD CONSTRAINT "training_day_exercise_training_day_id_fkey" FOREIGN KEY ("training_day_id") REFERENCES "training_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_day_exercise" ADD CONSTRAINT "training_day_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_training_day_id_fkey" FOREIGN KEY ("training_day_id") REFERENCES "training_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
