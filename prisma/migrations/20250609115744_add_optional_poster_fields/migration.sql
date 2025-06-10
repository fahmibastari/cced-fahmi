/*
  Warnings:

  - A unique constraint covering the columns `[posterFileId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "posterFileId" TEXT,
ADD COLUMN     "posterUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Job_posterFileId_key" ON "Job"("posterFileId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_posterFileId_fkey" FOREIGN KEY ("posterFileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
