-- CreateTable
CREATE TABLE "User" (
    "ID" SERIAL NOT NULL,
    "Nombre" TEXT NOT NULL,

    PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.Nombre_unique" ON "User"("Nombre");
