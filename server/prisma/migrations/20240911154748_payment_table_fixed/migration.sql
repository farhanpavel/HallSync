/*
  Warnings:

  - A unique constraint covering the columns `[form_id]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payment_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_student_id_fkey";

-- DropIndex
DROP INDEX "Form_student_id_key";

-- DropIndex
DROP INDEX "Payment_student_id_month_year_key";

-- CreateIndex
CREATE UNIQUE INDEX "Form_form_id_key" ON "Form"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_payment_id_key" ON "Payment"("payment_id");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;
