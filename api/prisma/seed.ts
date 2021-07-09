import { PrismaClient } from "@prisma/client";
import { connect } from "http2";
// import { add } from "date-fns";
import { data } from "./data";

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {


  // await prisma.rol.createMany({
  //   data: [
  //     {
  //       Rol: "USER",
  //     },
  //     {
  //       Rol: "ADMIN",
  //     },
  //   ],
  // });

  
  const rubia= await prisma.genericType.create({
    data: {
      GenericType: "rubia"
    },
  });
  await prisma.genericType.create({
    data: {
      GenericType: "roja"
    },
  });
  await prisma.genericType.create({
    data: {
      GenericType: "negra"
    },
  });
  await prisma.specificType.create({
    data: {
      SpecificType: "ipa",
      genericType:{connect:{id: rubia.id}}
    },
  });



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
