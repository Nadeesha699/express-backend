/*
  Warnings:

  - A unique constraint covering the columns `[UserName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ALTER COLUMN `UserName` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `User_UserName_key` ON `User`(`UserName`);
