/*
  Warnings:

  - You are about to alter the column `ano` on the `Filmes` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to alter the column `avaliacao` on the `Filmes` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Filmes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "avaliacao" INTEGER NOT NULL
);
INSERT INTO "new_Filmes" ("ano", "avaliacao", "genero", "id", "titulo") SELECT "ano", "avaliacao", "genero", "id", "titulo" FROM "Filmes";
DROP TABLE "Filmes";
ALTER TABLE "new_Filmes" RENAME TO "Filmes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
