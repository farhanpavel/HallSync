-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "hall_id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);
