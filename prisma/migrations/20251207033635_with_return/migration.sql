-- CreateTable
CREATE TABLE "Tool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Lain-lain',
    "description" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL,
    "borrowed" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "toolId" INTEGER NOT NULL,
    "toolName" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "nim" TEXT NOT NULL,
    "borrower" TEXT NOT NULL,
    "phone" TEXT,
    "isReturned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "History_toolId_idx" ON "History"("toolId");
