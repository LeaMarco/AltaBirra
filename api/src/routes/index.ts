import { Router } from 'express';
import beers from "./beers";
import register from "./register";
import post from "./post";
import transaction from "./transaction";
import cart from "./addToCart";
import editPost from "./editPost";


const router = Router();

router.use("/register", register);
router.use("/beer", beers);
router.use("/post", post);
router.use("/transaction", transaction);
router.use("/cart", cart);
router.use("/edit", editPost);


export default router;