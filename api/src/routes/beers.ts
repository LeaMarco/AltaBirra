import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import paginated from "../functions/funciones";
const router = Router();
const prisma = new PrismaClient();

// the /beers returns ALL the data instead when you do /beers?page=1 it returns it paged according to the number placed on page

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  let page: any = req.query.page;
  page = parseInt(page);

  const users = await prisma.products.findMany();
  page ? res.json(paginated(users, page)) : res.json(users);
});

export default router;
