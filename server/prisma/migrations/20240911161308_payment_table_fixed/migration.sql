/*
  Warnings:

  - A unique constraint covering the columns `[student_id]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Form_student_id_key" ON "Form"("student_id");
