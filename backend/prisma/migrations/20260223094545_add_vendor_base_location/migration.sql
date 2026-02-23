/*
  Warnings:

  - Added the required column `baseLocationCode` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "baseLocationCode" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "starLevel" INTEGER NOT NULL DEFAULT 3;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_baseLocationCode_fkey" FOREIGN KEY ("baseLocationCode") REFERENCES "Location"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
