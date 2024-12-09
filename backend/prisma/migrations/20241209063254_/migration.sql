/*
  Warnings:

  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nisn]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nuptk]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateBirth` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nisn` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noPhone` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeBirth` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateBirth` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noPhone` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nuptk` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeBirth` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `classes` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `students` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `dateBirth` DATETIME(3) NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    ADD COLUMN `nisn` VARCHAR(191) NOT NULL,
    ADD COLUMN `noPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `placeBirth` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `teachers` DROP COLUMN `email`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `dateBirth` DATETIME(3) NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    ADD COLUMN `noPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `nuptk` VARCHAR(191) NOT NULL,
    ADD COLUMN `placeBirth` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `students_nisn_key` ON `students`(`nisn`);

-- CreateIndex
CREATE UNIQUE INDEX `teachers_nuptk_key` ON `teachers`(`nuptk`);
