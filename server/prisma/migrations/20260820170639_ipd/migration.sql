/*
  Warnings:

  - Added the required column `name` to the `training_day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "training_day" ADD COLUMN     "name" TEXT NOT NULL;
