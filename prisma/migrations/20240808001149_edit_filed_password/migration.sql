/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Password" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ALTER COLUMN "fullname" DROP NOT NULL;
