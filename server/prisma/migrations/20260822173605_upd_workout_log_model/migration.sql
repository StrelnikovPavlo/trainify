-- DropForeignKey
ALTER TABLE "workout_log" DROP CONSTRAINT "workout_log_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_log" DROP CONSTRAINT "workout_log_session_id_fkey";

-- AddForeignKey
ALTER TABLE "workout_log" ADD CONSTRAINT "workout_log_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "workout_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_log" ADD CONSTRAINT "workout_log_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
