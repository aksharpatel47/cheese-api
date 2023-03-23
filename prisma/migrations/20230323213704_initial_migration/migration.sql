-- CreateTable
CREATE TABLE "Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "CheeseType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Cheese" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "Cheese_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CheeseAndCheeseTypes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cheeseId" INTEGER NOT NULL,
    "cheeseTypeId" INTEGER NOT NULL,
    CONSTRAINT "CheeseAndCheeseTypes_cheeseId_fkey" FOREIGN KEY ("cheeseId") REFERENCES "Cheese" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CheeseAndCheeseTypes_cheeseTypeId_fkey" FOREIGN KEY ("cheeseTypeId") REFERENCES "CheeseType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "_CheeseToCheeseType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CheeseToCheeseType_A_fkey" FOREIGN KEY ("A") REFERENCES "Cheese" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CheeseToCheeseType_B_fkey" FOREIGN KEY ("B") REFERENCES "CheeseType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CheeseAndCheeseTypes_cheeseId_cheeseTypeId_key" ON "CheeseAndCheeseTypes"("cheeseId", "cheeseTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CheeseToCheeseType_AB_unique" ON "_CheeseToCheeseType"("A", "B");

-- CreateIndex
CREATE INDEX "_CheeseToCheeseType_B_index" ON "_CheeseToCheeseType"("B");
