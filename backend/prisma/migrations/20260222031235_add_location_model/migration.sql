/*
  Warnings:

  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - Added the required column `locationCode` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "location",
ADD COLUMN     "locationCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationCode_fkey" FOREIGN KEY ("locationCode") REFERENCES "Location"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
