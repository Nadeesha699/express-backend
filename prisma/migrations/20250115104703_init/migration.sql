-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_UserId_fkey`;

-- DropIndex
DROP INDEX `Product_UserId_fkey` ON `product`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
