-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "anime_minutesWatched" INTEGER NOT NULL,
    "standardDeviation" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageUser" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "anime_count" INTEGER NOT NULL,
    "anime_minutesWatched" INTEGER NOT NULL,

    CONSTRAINT "PageUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "genre" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageUser_name_key" ON "PageUser"("name");

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PageUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
