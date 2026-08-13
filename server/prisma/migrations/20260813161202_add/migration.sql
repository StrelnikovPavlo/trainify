/*
  Warnings:

  - You are about to drop the column `equipment` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `muscle_group` on the `exercise` table. All the data in the column will be lost.
  - Added the required column `equipment_id` to the `exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscle_group_id` to the `exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercise" DROP COLUMN "equipment",
DROP COLUMN "muscle_group",
ADD COLUMN     "equipment_id" TEXT NOT NULL,
ADD COLUMN     "muscle_group_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "muscle_group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscle_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "muscle_group_name_key" ON "muscle_group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_name_key" ON "equipment"("name");

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscle_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
