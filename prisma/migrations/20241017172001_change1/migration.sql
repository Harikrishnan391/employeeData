/*
  Warnings:

  - You are about to drop the column `imagePath` on the `employee` table. All the data in the column will be lost.
  - Added the required column `profileImage` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `imagePath`,
    ADD COLUMN `profileImage` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `order` INTEGER NOT NULL;
