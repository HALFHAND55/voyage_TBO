-- CreateTable
CREATE TABLE "VendorCategory" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "category" "InventoryCategory" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorCategory_vendorId_idx" ON "VendorCategory"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorCategory_vendorId_category_key" ON "VendorCategory"("vendorId", "category");

-- AddForeignKey
ALTER TABLE "VendorCategory" ADD CONSTRAINT "VendorCategory_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
