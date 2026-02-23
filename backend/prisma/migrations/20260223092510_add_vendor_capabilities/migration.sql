/*
  Warnings:

  - Changed the type of `category` on the `EventOperation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EventOperation" DROP COLUMN "category",
ADD COLUMN     "category" "InventoryCategory" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EventOperation_eventId_category_key" ON "EventOperation"("eventId", "category");
