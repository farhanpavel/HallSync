-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_payment_id_fkey";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Form"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
