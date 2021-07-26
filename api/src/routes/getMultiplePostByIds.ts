import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {

    let idsPostsArray: number[];
    let amountArray: number[];


    if (typeof req.query.guestsItemsInCart === "string") {
        const parseJson = JSON.parse(req.query.guestsItemsInCart)
        idsPostsArray = Object.keys(parseJson).map(i => parseInt(i))
        amountArray = Object.values(parseJson)
    }
    else return res.status(400).send("Error inesperado: el token recibido no es de tipo string??")

    const posts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    id: {
                        in: idsPostsArray
                    }
                }

            ],
        },
        include: {
            beer: true,
            countable: true,

        },
    })
    console.log(amountArray)
    const mimeticPostOnCartResponse = posts.map((e, index) => ({ amount: amountArray[index], post: e }))

    res.json(mimeticPostOnCartResponse)
})
/*
0:
amount: 3
cart: {id: 4, userId: {…}}
post: {id: 2, title: "Shump", description: "Lorem ipsum dolor sit amet consectetur adipisicing…cumque reprehenderit aspernatur reiciendis ullam?", image: "https://labarriadacooperativa.com.ar/wp-content/up…020/10/WhatsApp-Image-2020-10-05-at-12.52.56.jpeg", rating: 3, …}
[[Prototype]]: Object

1: {amount: 1, post: {…}, cart: {…}}
2: {amount: 1, post: {…}, cart: {…}}
 */

export default router;