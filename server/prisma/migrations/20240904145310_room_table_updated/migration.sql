/*
  Warnings:

  - Added the required column `bed_number` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hall_id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_beds` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "bed_number" INTEGER NOT NULL,
ADD COLUMN     "booked_beds" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hall_id" TEXT NOT NULL,
ADD COLUMN     "total_beds" INTEGER NOT NULL;
