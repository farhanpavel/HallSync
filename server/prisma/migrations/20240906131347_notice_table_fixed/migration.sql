/*
  Warnings:

  - You are about to drop the column `role` on the `Notice` table. All the data in the column will be lost.
  - Added the required column `id` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "role",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL;
