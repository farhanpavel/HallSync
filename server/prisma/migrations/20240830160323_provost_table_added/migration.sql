/*
  Warnings:

  - Added the required column `message` to the `provost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "provost" ADD COLUMN     "message" TEXT NOT NULL;
