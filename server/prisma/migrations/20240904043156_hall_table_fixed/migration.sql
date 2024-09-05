/*
  Warnings:

  - Added the required column `floor` to the `Hall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hall" ADD COLUMN     "floor" TEXT NOT NULL;
