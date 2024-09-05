-- CreateTable
CREATE TABLE "Form" (
    "form_id" TEXT NOT NULL,
    "registration_num" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "enroll_year" TIMESTAMP(3) NOT NULL,
    "expected_grad" TIMESTAMP(3) NOT NULL,
    "hall_id" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("form_id")
);
