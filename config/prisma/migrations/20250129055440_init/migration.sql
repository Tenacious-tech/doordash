-- CreateTable
CREATE TABLE "Delivery" (
    "external_delivery_id" TEXT NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "pickup_business_name" TEXT NOT NULL,
    "pickup_phone_number" TEXT NOT NULL,
    "pickup_instructions" TEXT NOT NULL,
    "dropoff_address" TEXT NOT NULL,
    "dropoff_business_name" TEXT NOT NULL,
    "dropoff_phone_number" TEXT NOT NULL,
    "dropoff_instructions" TEXT NOT NULL,
    "order_value" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "pickup_time_estimated" TIMESTAMP(3) NOT NULL,
    "dropoff_time_eatimated" TIMESTAMP(3) NOT NULL,
    "pickup_time_actual" TIMESTAMP(3) NOT NULL,
    "dropoff_time_actual" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_external_delivery_id_key" ON "Delivery"("external_delivery_id");
