/*
  Warnings:

  - The `gender` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `memberType` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "memberType",
ADD COLUMN     "memberType" TEXT NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT;

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "MemberType";
