import { Router } from 'express';
import beers from "./beers";
import register from "./register";
import createPost from "./createPost";
import getSearchedPost from "./getSearchedPost";
import transaction from "./transaction";
import cart from "./addToCart";
import editPost from "./editPost";

import detail from "./detail"

const router = Router();

router.use("/register", register);
router.use("/beer", beers);
router.use("/post", createPost);
router.use("/post", getSearchedPost);
router.use("/transaction", transaction);
router.use("/cart", cart);
router.use("/edit", editPost);

router.use("/detailBeer", detail);

export default router;