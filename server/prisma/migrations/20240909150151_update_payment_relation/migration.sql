/*
  Warnings:

  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[student_id,month,year]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_student_id_month_year_key" ON "Payment"("student_id", "month", "year");
