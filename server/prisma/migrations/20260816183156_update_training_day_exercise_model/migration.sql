-- DropForeignKey
ALTER TABLE "training_day_exercise" DROP CONSTRAINT "training_day_exercise_training_day_id_fkey";

-- AddForeignKey
ALTER TABLE "training_day_exercise" ADD CONSTRAINT "training_day_exercise_training_day_id_fkey" FOREIGN KEY ("training_day_id") REFERENCES "training_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
