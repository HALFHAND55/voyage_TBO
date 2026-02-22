/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `vendorName` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InventoryCategory" AS ENUM ('TECHNICAL', 'FURNITURE', 'DECOR', 'STAFF', 'CATERING', 'ACCOMMODATION', 'FLOOR_SPACE');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "vendorName",
ALTER COLUMN "isActive" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "EventVendor" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "EventVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "InventoryCategory" NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventInventoryAllocation" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "quantityAllocated" INTEGER NOT NULL,

    CONSTRAINT "EventInventoryAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventVendor_eventId_vendorId_key" ON "EventVendor"("eventId", "vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "EventInventoryAllocation_eventId_inventoryItemId_key" ON "EventInventoryAllocation"("eventId", "inventoryItemId");

-- AddForeignKey
ALTER TABLE "EventVendor" ADD CONSTRAINT "EventVendor_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventVendor" ADD CONSTRAINT "EventVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInventoryAllocation" ADD CONSTRAINT "EventInventoryAllocation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInventoryAllocation" ADD CONSTRAINT "EventInventoryAllocation_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
