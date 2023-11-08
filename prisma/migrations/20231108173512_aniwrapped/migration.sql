/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PageUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PageUser_name_key" ON "PageUser"("name");
