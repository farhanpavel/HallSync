/*
  Warnings:

  - You are about to drop the column `bed_count` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `room_no` on the `Room` table. All the data in the column will be lost.
  - Added the required column `room` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "bed_count",
DROP COLUMN "room_no",
ADD COLUMN     "room" TEXT NOT NULL;
