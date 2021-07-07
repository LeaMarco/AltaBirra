import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import paginated from "../functions/funciones";
const router = Router();
const prisma = new PrismaClient();

// Make the call with /beers or with /beers?page=1 if you want it paginated

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  let page: any = req.query.page;
  page = parseInt(page);

  const users = await prisma.products.findMany();
  page ? res.json(paginated(users, page)) : res.json(users);
});

export default router;
