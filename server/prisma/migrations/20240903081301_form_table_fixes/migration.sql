/*
  Warnings:

  - The `active` column on the `Form` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "active",
ADD COLUMN     "active" INTEGER NOT NULL DEFAULT 0;
