import { Router } from 'express';
import beers from "./beers";
import register from "./register";
import createPost from "./createPost";
import getSearchedPost from "./getSearchedPost";
import transaction from "./transaction";
import cart from "./addToCart";
import editPost from "./editPost";
import deletePost from "./deletePost";
import removeBeer from "./removeToCart";
import specificType from "./getSpecificTypes"
import genericType from "./getGenericTypes"
import autoComplete from "./autocomplete";
import detail from "./detail"
import addFavorite from "./addFavorite";
import getFavorites from "./getFavorites";
import removeFavorite from "./removeFavorite";

const router = Router();

router.use("/register", register);
router.use("/beer", beers);
router.use("/post", createPost);
router.use("/post", getSearchedPost);
router.use("/transaction", transaction);
router.use("/cart", cart);
router.use("/edit", editPost);
router.use("/delete", deletePost);
router.use("/remove", removeBeer);
router.use("/specificTypes", specificType);
router.use("/genericTypes", genericType);
router.use("/autocomplete", autoComplete);
router.use("/detailBeer", detail);
router.use("/addFavorite", addFavorite);
router.use("/getFavorites", getFavorites);
router.use("/removeFavorite", removeFavorite);

export default router;