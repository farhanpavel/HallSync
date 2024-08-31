/*
  Warnings:

  - You are about to drop the `provost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "provost";

-- CreateTable
CREATE TABLE "Provost" (
    "sender_id" TEXT NOT NULL,
    "provost_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Provost_pkey" PRIMARY KEY ("sender_id")
);
