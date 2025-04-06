/*
  Warnings:

  - Made the column `tag` on table `Tags` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tags" ALTER COLUMN "tag" SET NOT NULL;
