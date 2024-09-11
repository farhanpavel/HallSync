-- DropIndex
DROP INDEX "Payment_payment_id_key";

-- AlterTable
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id");
