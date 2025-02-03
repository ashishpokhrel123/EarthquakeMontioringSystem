/*
  Warnings:

  - You are about to alter the column `frequency` on the `EarthquakeReading` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "EarthquakeReading" ALTER COLUMN "frequency" SET DATA TYPE INTEGER;
