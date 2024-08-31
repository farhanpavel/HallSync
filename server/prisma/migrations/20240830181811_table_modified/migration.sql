/*
  Warnings:

  - You are about to drop the `Provost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Provost" DROP CONSTRAINT "Provost_provost_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_student_id_fkey";

-- DropTable
DROP TABLE "Provost";

-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "Hall" (
    "hall_id" TEXT NOT NULL,
    "hall_name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "room" INTEGER NOT NULL,
    "bed" INTEGER NOT NULL,

    CONSTRAINT "Hall_pkey" PRIMARY KEY ("hall_id")
);

-- CreateTable
CREATE TABLE "Assignprovost" (
    "hall_id" TEXT NOT NULL,
    "provost_id" TEXT NOT NULL,

    CONSTRAINT "Assignprovost_pkey" PRIMARY KEY ("hall_id")
);

-- AddForeignKey
ALTER TABLE "Assignprovost" ADD CONSTRAINT "Assignprovost_hall_id_fkey" FOREIGN KEY ("hall_id") REFERENCES "Hall"("hall_id") ON DELETE CASCADE ON UPDATE CASCADE;
