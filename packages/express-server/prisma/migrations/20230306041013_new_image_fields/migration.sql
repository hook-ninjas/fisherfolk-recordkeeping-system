-- AlterTable
ALTER TABLE "image" ADD COLUMN     "is_profile_image" BOOLEAN DEFAULT false,
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "type" TEXT;
