/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Employee";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Filmes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "ano" REAL NOT NULL,
    "avaliacao" REAL NOT NULL
);
