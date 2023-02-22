/*
  Warnings:

  - You are about to drop the column `format` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "image" DROP COLUMN "format",
DROP COLUMN "version";
