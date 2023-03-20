-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_User" ("createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "deletedAt", "email", "id", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_CheeseType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_CheeseType" ("createdAt", "deletedAt", "id", "name", "updatedAt") SELECT "createdAt", "deletedAt", "id", "name", "updatedAt" FROM "CheeseType";
DROP TABLE "CheeseType";
ALTER TABLE "new_CheeseType" RENAME TO "CheeseType";
CREATE TABLE "new_Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_Brand" ("createdAt", "deletedAt", "id", "name", "updatedAt") SELECT "createdAt", "deletedAt", "id", "name", "updatedAt" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
CREATE TABLE "new_Cheese" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "Cheese_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cheese" ("brandId", "createdAt", "deletedAt", "id", "name", "updatedAt") SELECT "brandId", "createdAt", "deletedAt", "id", "name", "updatedAt" FROM "Cheese";
DROP TABLE "Cheese";
ALTER TABLE "new_Cheese" RENAME TO "Cheese";
CREATE TABLE "new_CheeseAndCheeseTypes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cheeseId" INTEGER NOT NULL,
    "cheeseTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "CheeseAndCheeseTypes_cheeseId_fkey" FOREIGN KEY ("cheeseId") REFERENCES "Cheese" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CheeseAndCheeseTypes_cheeseTypeId_fkey" FOREIGN KEY ("cheeseTypeId") REFERENCES "CheeseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CheeseAndCheeseTypes" ("cheeseId", "cheeseTypeId", "createdAt", "deletedAt", "id", "updatedAt") SELECT "cheeseId", "cheeseTypeId", "createdAt", "deletedAt", "id", "updatedAt" FROM "CheeseAndCheeseTypes";
DROP TABLE "CheeseAndCheeseTypes";
ALTER TABLE "new_CheeseAndCheeseTypes" RENAME TO "CheeseAndCheeseTypes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
