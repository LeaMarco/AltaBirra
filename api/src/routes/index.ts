import { Router } from 'express';
import beers from "./beers";
import register from "./register";
import createPost from "./createPost";
import getSearchedPost from "./getSearchedPost";
import transaction from "./transaction";
import cart from "./addToCart";
import getCart from "./getCart";
import editPost from "./editPost";
import deletePost from "./deletePost";
import removePost from "./removeToCart";
import specificType from "./getSpecificTypes"
import genericType from "./getGenericTypes"
import autoComplete from "./autocomplete";
import detail from "./detail"
import addFavorite from "./addFavorite";
import getFavorites from "./getFavorites";
import deleteAllCart from "./deleteAllCart";
import mercadoPago from "./mercadoPago";
import removeFavorite from "./removeFavorite";
import ratePost from "./ratePost";
import sellHistory from "./sellHistory";
import addToCart from './addToCart';
import autentication from "../autentication/routes/auth"
import buyHistory from "./buyHistory";
import { tokenValidation } from '../autentication/libs/verifyToken';

const router = Router();


router.use("/auth/", autentication)
router.use("/register", register);
router.use("/beer", beers);
router.use("/post", tokenValidation, createPost);
router.use("/post", getSearchedPost);
router.use("/transaction", transaction);
router.use("/cart", cart);
router.use("/addToCart", addToCart);
router.use("/cart", getCart);
router.use("/edit", editPost);
router.use("/delete", deletePost);
router.use("/removeToCart", removePost);
router.use("/deleteAllCart", deleteAllCart);
router.use("/specificTypes", specificType);
router.use("/genericTypes", genericType);
router.use("/autocomplete", autoComplete);
router.use("/detailBeer", detail);
router.use("/addFavorite", addFavorite);
router.use("/getFavorites", getFavorites);
router.use("/checkout", mercadoPago);
router.use("/removeFavorite", removeFavorite);
router.use("/ratePost", ratePost);
router.use("/sellHistory", sellHistory);
router.use("/buyHistory", buyHistory);


export default router;