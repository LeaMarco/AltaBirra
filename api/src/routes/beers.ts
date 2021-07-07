import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import paginated from '../functions/funciones';
const router = Router();
const prisma = new PrismaClient()




router.get("/", async (req: Request, res:Response, next: NextFunction) => {
    let page: any = req.query.page;
    page = parseInt(page);

    const users = await prisma.products.findMany();
    res.json(paginated(users, page))
})



export default router;