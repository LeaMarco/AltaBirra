import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

interface Cart {
	username: string;
	postId: number;
}

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body,"PARAMS DELETE");
	const { username, postId }: Cart = req.body.params;
	const user = await prisma.user.findUnique({ where: { username: username } });
	const cart = await prisma.cart.findFirst({ where: { userId: user } });
	if(cart?.id)await prisma.postsOnCart.delete({
		where: {
        	cartId_postId: {cartId: cart.id, postId:postId  }
		}
	})
	res.send("Borrado del carrito");
});

export default router;

