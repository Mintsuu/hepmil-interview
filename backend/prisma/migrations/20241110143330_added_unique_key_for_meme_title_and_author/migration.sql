/*
  Warnings:

  - A unique constraint covering the columns `[posted_by,title]` on the table `Memes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Memes_posted_by_title_key" ON "Memes"("posted_by", "title");
