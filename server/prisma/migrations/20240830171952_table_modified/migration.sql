/*
  Warnings:

  - You are about to drop the column `message` on the `Provost` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `Provost` table. All the data in the column will be lost.
  - You are about to drop the `Pending` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `active_data` to the `Provost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pending" DROP CONSTRAINT "Pending_id_fkey";

-- AlterTable
ALTER TABLE "Provost" DROP COLUMN "message",
DROP COLUMN "sender_id",
ADD COLUMN     "active_data" TEXT NOT NULL;

-- DropTable
DROP TABLE "Pending";

-- CreateTable
CREATE TABLE "Student" (
    "student_id" TEXT NOT NULL,
    "active_data" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
