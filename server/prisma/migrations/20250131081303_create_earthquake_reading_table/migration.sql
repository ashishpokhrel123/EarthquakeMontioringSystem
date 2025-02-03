-- CreateTable
CREATE TABLE "EarthquakeReading" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "frequency" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EarthquakeReading_pkey" PRIMARY KEY ("id")
);
