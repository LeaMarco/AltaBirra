import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import mercadopago from "mercadopago"
import { MercadoPago } from "mercadopago/interface";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { title } from "process";

const router = Router();
const prisma = new PrismaClient();


router.post("/create_preference", (req: Request, res: Response) => {

    mercadopago.configurations.setAccessToken("TEST-6705724658801749-071415-219eZiN2tzLnyxKgvwAvMKgAny5qTvDDgtd-30499530");
      let preference:CreatePreferencePayload = {
          items: [{
              title: req.body.description,
              unit_price: Number(req.body.price),
              quantity: Number(req.body.quantity),
          }],
          back_urls: { ////////urls donde te redirige en base a lo que respondio mp, puede
              "success": "http://localhost:8080/feedback",
              "failure": "http://localhost:8080/feedback",
              "pending": "http://localhost:8080/feedback"
          },
          auto_return: "approved",
      };
      mercadopago.preferences.create(preference)
          .then(function (response:any) {
              res.json({id :response.body.id})
          }).catch(function (error:any) {
              console.log(error);
          });
  });
  router.get('/feedback', function(req: Request, res: Response) {
       res.json({
          Payment: req.query.payment_id,
          Status: req.query.status,
          MerchantOrder: req.query.merchant_order_id
      })
  });

  export default router;