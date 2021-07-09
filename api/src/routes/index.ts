import { Router } from 'express';
import beers from "./beers";
import register from "./register"


const router = Router();

router.use("/register", register)
router.use("/beer", beers)




export default router;