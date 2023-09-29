/*
  Warnings:

  - The primary key for the `photos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `url` on the `photos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "photos" DROP CONSTRAINT "photos_pkey",
DROP COLUMN "url",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "photos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "photos_id_seq";
