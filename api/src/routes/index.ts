import { Router } from 'express';
import beers from "./beers";

const router = Router();

router.use("/beers", beers)



export default router;