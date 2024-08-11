-- CreateTable
CREATE TABLE "OnlineUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "socketId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnlineUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnlineUser_username_key" ON "OnlineUser"("username");
