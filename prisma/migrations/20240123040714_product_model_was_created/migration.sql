-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "img" TEXT[],
    "price" INTEGER NOT NULL,
    "link" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
