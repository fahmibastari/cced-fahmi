/*
  Warnings:

  - A unique constraint covering the columns `[companyPhone]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('Pekerja_Tetap', 'Kontrak', 'Magang');

-- CreateEnum
CREATE TYPE "WorkTime" AS ENUM ('Full_Time', 'Part_Time');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "employmentType" TEXT,
ADD COLUMN     "workTime" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyPhone_key" ON "Company"("companyPhone");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_berkasId_fkey" FOREIGN KEY ("berkasId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
