import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import mercadopago = require("mercadopago");
import { MercadoPago } from "mercadopago/interface";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { title } from "process";
import { findUserWithAnyTokenBabe } from "../autentication/controllers/auth.controller";

const router = Router();
const prisma = new PrismaClient();

////////////carga todo en el carrito
///////////////generar array de items
//////////////items=[{item1},{item2}....] <-- viene por params o body?

interface item {
    description: string,
    quantity: number,
    price: number
}


router.post("/", async (req: Request, res: Response) => { //☢La hice async para poner el await -Eze
    const user = await findUserWithAnyTokenBabe(req, prisma)//Dejo el user por si acaso -Eze
    const { data }: any = req.body
    mercadopago.configurations.setAccessToken("TEST-6705724658801749-071415-219e5d5e25d43808d51486e102a0e9ed-30499530");

    let preference: CreatePreferencePayload = {
        items: data.data,
        back_urls: { ////////urls donde te redirige en base a lo que respondio mp, puede
            "success": `${process.env.HOST_FRONT}/panel/historialCompras`,
            "failure": "https://localhost:8080/feedback",
            "pending": "https://localhost:8080/feedback"
        },
        auto_return: "approved",
    };
    mercadopago.preferences.create(preference)
        .then(function (response: any) {
            res.json({ id: response.body.id })
        }).catch(function (error: any) {
            console.log(error);
        });
});

router.get('/feedback', function (req: Request, res: Response) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    })
});

export default router;