-- CreateTable
CREATE TABLE "PageUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "anime_count" INTEGER NOT NULL,
    "anime_minutesWatched" INTEGER NOT NULL,

    CONSTRAINT "PageUser_pkey" PRIMARY KEY ("id")
);
