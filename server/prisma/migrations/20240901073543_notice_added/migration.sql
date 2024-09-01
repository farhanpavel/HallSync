/*
  Warnings:

  - You are about to drop the column `descreption` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `description` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "descreption",
ADD COLUMN     "description" TEXT NOT NULL;
