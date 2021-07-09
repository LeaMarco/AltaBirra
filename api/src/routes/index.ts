import { Router } from 'express';
import beers from "./beers";
import register from "./register";
import post from "./post";


const router = Router();

router.use("/register", register)
router.use("/beer", beers)
router.use("/post", post)





export default router;