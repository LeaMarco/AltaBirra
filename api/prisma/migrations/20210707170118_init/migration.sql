-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "alcohol" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ibu" INTEGER NOT NULL,
    "review" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
