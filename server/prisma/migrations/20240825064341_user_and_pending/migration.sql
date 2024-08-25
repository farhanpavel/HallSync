-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Pending" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Pending_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Pending" ADD CONSTRAINT "Pending_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
