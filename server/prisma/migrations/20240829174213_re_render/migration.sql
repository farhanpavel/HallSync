-- DropForeignKey
ALTER TABLE "Pending" DROP CONSTRAINT "Pending_id_fkey";

-- AddForeignKey
ALTER TABLE "Pending" ADD CONSTRAINT "Pending_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
