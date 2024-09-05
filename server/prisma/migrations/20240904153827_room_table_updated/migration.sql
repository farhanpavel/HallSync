/*
  Warnings:

  - You are about to drop the column `bed_number` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `booked_beds` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `hall_id` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `total_beds` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "bed_number",
DROP COLUMN "booked_beds",
DROP COLUMN "hall_id",
DROP COLUMN "total_beds",
ADD COLUMN     "bed_count" INTEGER NOT NULL DEFAULT 0;
