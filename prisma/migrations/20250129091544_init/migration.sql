-- CreateTable
CREATE TABLE "Delivery" (
    "external_delivery_id" TEXT NOT NULL,
    "pickup_address" TEXT,
    "pickup_business_name" TEXT,
    "pickup_phone_number" TEXT,
    "pickup_instructions" TEXT,
    "dropoff_address" TEXT,
    "dropoff_business_name" TEXT,
    "dropoff_phone_number" TEXT,
    "dropoff_instructions" TEXT,
    "order_value" INTEGER,
    "status" TEXT,
    "fee" INTEGER,
    "pickup_time_estimated" TIMESTAMP(3),
    "dropoff_time_eatimated" TIMESTAMP(3),
    "pickup_time_actual" TIMESTAMP(3),
    "dropoff_time_actual" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_external_delivery_id_key" ON "Delivery"("external_delivery_id");
