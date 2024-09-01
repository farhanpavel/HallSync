-- CreateTable
CREATE TABLE "Notice" (
    "notice_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descreption" TEXT NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("notice_id")
);
