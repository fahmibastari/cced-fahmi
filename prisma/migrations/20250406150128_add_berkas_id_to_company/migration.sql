/*
  Warnings:

  - A unique constraint covering the columns `[berkasId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "berkasId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_berkasId_key" ON "Company"("berkasId");
