/*
  Warnings:

  - The `room_no` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `hall_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "hall_id" TEXT NOT NULL,
DROP COLUMN "room_no",
ADD COLUMN     "room_no" INTEGER NOT NULL DEFAULT 0;
