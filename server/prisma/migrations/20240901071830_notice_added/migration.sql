/*
  Warnings:

  - The primary key for the `Notice` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_pkey",
ALTER COLUMN "notice_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notice_pkey" PRIMARY KEY ("notice_id");
