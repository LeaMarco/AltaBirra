import { Router } from 'express';
import beers from "./beers";

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
import verifyUser from "./verifyUser";
import AUTOPOST_ONLY_DEVELOPMENT_ROUTE from "./AUTOPOST_ONLY_DEVELOPMENT_ROUTE";
import { tokenValidation } from '../autentication/libs/verifyToken';
import getMultiplePostByIds from './getMultiplePostByIds'
import desactivateAccount from '../autentication/controllers/desactivateAccount'

const router = Router();

router.use("/auth/", autentication)//autenticacion de usuarios

router.use("/beer", beers);//trae los posts para el home
router.use("/post", getSearchedPost);//devuelve post buscados
router.use("/specificTypes", specificType);
router.use("/genericTypes", genericType);
router.use("/autocomplete", autoComplete);//autocompletar el search
router.use("/detailBeer", detail);//ruta detalle de post
router.use("/detail", detail);//ruta detalle de post
router.use("/verify", verifyUser);//ruta para verificar cuenta

router.use('/AUTOPOST_ONLY_DEVELOPMENT_ROUTE', AUTOPOST_ONLY_DEVELOPMENT_ROUTE)//asociado al boton de posts automatico, pero sin verificacion para que no colapse la validacion de token por terceros

router.use("/getMultiplePostByIds", getMultiplePostByIds);//
router.use("/desactivateAccount", tokenValidation, desactivateAccount)//PATCH
router.use("/post", tokenValidation, createPost);//crea un nuevo post
router.use("/transaction", tokenValidation, transaction);// escribe una transaccion
router.use("/cart", tokenValidation, cart);//es un put/
router.use("/addToCart", tokenValidation, addToCart);//agrega posts al carrito/
router.use("/cart", tokenValidation, getCart);//devuelve el carrito de un usuario en particular con sus posts, es un GET! 
router.use("/edit", tokenValidation, editPost);
router.use("/delete", tokenValidation, deletePost);
router.use("/removeToCart", tokenValidation, removePost);
router.use("/deleteAllCart", tokenValidation, deleteAllCart);
router.use("/addFavorite", tokenValidation, addFavorite);
router.use("/getFavorites", tokenValidation, getFavorites);
router.use("/checkout", tokenValidation, mercadoPago);//ruta de pago, genera el boton de mercado libre segun los datos que se le pasaron del front
router.use("/removeFavorite", tokenValidation, removeFavorite);//
router.use("/ratePost", tokenValidation, ratePost);//
router.use("/sellHistory", tokenValidation, sellHistory);////**@Ruta sin front */
router.use("/buyHistory", tokenValidation, buyHistory);///**@Ruta sin front */



export default router;