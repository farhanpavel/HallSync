/*
  Warnings:

  - You are about to drop the `Assignprovost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignprovost" DROP CONSTRAINT "Assignprovost_hall_id_fkey";

-- DropTable
DROP TABLE "Assignprovost";

-- CreateTable
CREATE TABLE "Provost" (
    "provost_id" TEXT NOT NULL,
    "active" TEXT NOT NULL,
    "hall_id" TEXT NOT NULL,

    CONSTRAINT "Provost_pkey" PRIMARY KEY ("provost_id")
);

-- AddForeignKey
ALTER TABLE "Provost" ADD CONSTRAINT "Provost_provost_id_fkey" FOREIGN KEY ("provost_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
