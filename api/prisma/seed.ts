import { PrismaClient } from "@prisma/client";
// import { add } from "date-fns";
import { data } from "./data";

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  //Para cargar la data descomenta estas lineas y ejecuta, luego vuelve a comentar :)
  // console.log("aja");
  for (let i in data) {
    const beers = await prisma.products.create({
      data: {
        Name: data[i].Name,
        description: data[i].description,
        alcohol: data[i].alcohol,
        price: data[i].price,
        ibu: data[i].ibu,
        review: data[i].review,
        image: data[i].Img,
      },
    });
  }
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
