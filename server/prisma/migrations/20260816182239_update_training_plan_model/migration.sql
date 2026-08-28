-- DropForeignKey
ALTER TABLE "training_plan" DROP CONSTRAINT "training_plan_user_id_fkey";

-- AddForeignKey
ALTER TABLE "training_plan" ADD CONSTRAINT "training_plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
