-- CreateEnum
CREATE TYPE "MemeFormat" AS ENUM ('image', 'gif', 'video');

-- CreateTable
CREATE TABLE "Memes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "posted_on" TIMESTAMP(3) NOT NULL,
    "format" "MemeFormat" NOT NULL,
    "total_likes" INTEGER NOT NULL,
    "total_comments" INTEGER NOT NULL,
    "live_link" TEXT NOT NULL,
    "thumbnail_link" TEXT NOT NULL,
    "posted_by" TEXT NOT NULL,

    CONSTRAINT "Memes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Memes_id_key" ON "Memes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Author_id_key" ON "Author"("id");

-- AddForeignKey
ALTER TABLE "Memes" ADD CONSTRAINT "Memes_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
