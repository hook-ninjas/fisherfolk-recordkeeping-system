/*
  Warnings:

  - You are about to drop the column `end_date` on the `government_aid` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `government_aid` table. All the data in the column will be lost.
  - Added the required column `date` to the `government_aid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `government_aid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "government_aid" DROP COLUMN "end_date",
DROP COLUMN "start_date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "image" ADD COLUMN     "government_aid_id" INTEGER;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_government_aid_id_fkey" FOREIGN KEY ("government_aid_id") REFERENCES "government_aid"("id") ON DELETE SET NULL ON UPDATE CASCADE;
