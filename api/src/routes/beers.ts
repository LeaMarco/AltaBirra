import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Body {
  abv: number;
  og: number;
  ibu: number;
  calories: number;
  dryHop: boolean;
  volume: number;
  genericType: string;
  specificType: string;
}

interface OrderPosts {
	createdAt?:  Prisma.SortOrder;
	// review?: Prisma.SortOrder;
	rating?: Prisma.SortOrder;
}



// router.post("/", async (req: Request, res: Response, next: NextFunction) => {
//   const {
//     abv,
//     og,
//     ibu,
//     calories,
//     dryHop,
//     volume,
//     genericType,
//     specificType,
//   }: Body = req.body;

//   const beerGenericType = await prisma.genericType.findUnique({ where: { type: genericType } });
//   const beerSpecificType = await prisma.specificType.findUnique({ where: { type: specificType } });

//   await prisma.beer.create({
//     data: {
//       abv,
//       og,
//       ibu,
//       calories,
//       dryHop,
//       volume,
//       genericType: {
//         connect: { id: beerGenericType?.id },
//       },
//       specificType: {
//         connect: { id: beerSpecificType?.id },
//       },
//     },
//   }).catch(error => (console.log(error)))
//   res.send("creado");
// });


// HECHO POR FACU: ruta creada para obtener las cervezas "Premium"

router.get('/premium', async (req:Request, res:Response) => {
  var premiumBeers = await prisma.post.findMany({
    where: {
      user: {
        is: { premium: true }
      }
    },
    include: {
      countable: true,
      beer: true
    }

  });
  if(premiumBeers.length === 0) return res.send('No hay cervezas premium');
  else {let firstRandomBeer= Math.floor(Math.random() * (premiumBeers.length-6))
  premiumBeers= premiumBeers.slice(firstRandomBeer, firstRandomBeer+5)
   return res.json(premiumBeers);}
}) // cerrar funcion




router.get('/news', async (req:Request, res:Response) => {
  let orderTemp: OrderPosts | undefined = {  createdAt: "desc"  }
  
  var newBeers = await prisma.post.findMany({
    include: {
      countable: true,
      beer: true,
    },
    orderBy: orderTemp
  });
  newBeers= newBeers.slice(0, 5)
   return res.json(newBeers);
}) // cerrar funcion

router.get('/ranked', async (req:Request, res:Response) => {
  let orderTemp: OrderPosts | undefined = { rating: "desc" }
  
  var rankedBeers = await prisma.post.findMany({
    include: {
      countable: true,
      beer: true,
      review: true,
    },
    orderBy: orderTemp
  });
  rankedBeers= rankedBeers.slice(0, 5)
   return res.json(rankedBeers);
}) // cerrar funcion


router.get('/premium', async (req:Request, res:Response) => {
  var premiumUsers = await prisma.post.findMany({
    where: {
      user: {
        is: { premium: true }
      }
    },
    include: {
      countable: true,
      beer: true
    }

  });

  
  
  if(premiumUsers.length === 0) return res.send('VACIO');
  else return res.json(premiumUsers);

}) // cerrar funcion








export default router;

