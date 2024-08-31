/*
  Warnings:

  - The primary key for the `Provost` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Provost" DROP CONSTRAINT "Provost_pkey",
ADD CONSTRAINT "Provost_pkey" PRIMARY KEY ("provost_id");

-- AddForeignKey
ALTER TABLE "Provost" ADD CONSTRAINT "Provost_provost_id_fkey" FOREIGN KEY ("provost_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
