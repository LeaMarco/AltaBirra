import { Router } from 'express';
import beers from "./beers";
import register from "./register";
import createPost from "./createPost";
import getSearchedPost from "./getSearchedPost";
import transaction from "./transaction";
import cart from "./addToCart";
import getCart from "./getCart";
import editPost from "./editPost";
import upload from "./upload";
import deletePost from "./deletePost";
import removePost from "./removeToCart";
import specificType from "./getSpecificTypes"
import groupType from "./getGroupTypes"
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
import autentication from "../autentication/authRoutes/auth"
import buyHistory from "./buyHistory";
import editUsers from "./EditUsers";

import { tokenValidation } from '../autentication/libs/verifyToken';

const router = Router();


router.use("/auth/", autentication)//autenticacion de usuarios
router.use("/register", register);//registro de usuarios
router.use("/beer", beers);//trae los posts para el home
router.use("/post", getSearchedPost);//devuelve post buscados
router.use("/specificTypes", specificType);
router.use("/groupTypes", groupType);
router.use("/genericTypes", genericType);
router.use("/autocomplete", autoComplete);//autocompletar el search
router.use("/detailBeer", detail);//ruta detalle de post
router.use("/post", /* tokenValidation, */ createPost);//crea un nuevo post
router.use("/transaction", /* tokenValidation, */ transaction);// escribe una transaccion
router.use("/cart", /* tokenValidation, */ cart);//es un put
router.use("/addToCart", /* tokenValidation, */ addToCart);//agrega posts al carrito
router.use("/cart", /* tokenValidation, */ getCart);//devuelve el carrito de un usuario en particular con sus posts, es un GET! 
router.use("/edit", /* tokenValidation, */ editPost);
router.use("/delete", /* tokenValidation, */ deletePost);
router.use("/removeToCart", /* tokenValidation, */ removePost);
router.use("/deleteAllCart", /* tokenValidation, */ deleteAllCart);
router.use("/addFavorite", /* tokenValidation, */ addFavorite);
router.use("/getFavorites", /* tokenValidation, */ getFavorites);
router.use("/checkout", /* tokenValidation, */ mercadoPago);//ruta de pago, genera el boton de mercado libre segun los datos que se le pasaron del front
router.use("/removeFavorite", /* tokenValidation, */ removeFavorite);//
router.use("/ratePost", /* tokenValidation, */ ratePost);//
router.use("/sellHistory", /* tokenValidation, */ sellHistory);//
router.use("/buyHistory", /* tokenValidation, */ buyHistory);//
router.use("/editUsers", /* tokenValidation, */ editUsers);//



export default router;