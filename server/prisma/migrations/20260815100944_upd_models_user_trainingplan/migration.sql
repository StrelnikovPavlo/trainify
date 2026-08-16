/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `training_plan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "training_day" DROP CONSTRAINT "training_day_training_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_session" DROP CONSTRAINT "workout_session_training_day_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "training_plan_user_id_key" ON "training_plan"("user_id");

-- AddForeignKey
ALTER TABLE "training_day" ADD CONSTRAINT "training_day_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_training_day_id_fkey" FOREIGN KEY ("training_day_id") REFERENCES "training_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
