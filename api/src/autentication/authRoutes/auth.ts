import { Router } from 'express';
import { signup, signin, profile, wipe, localSignIn, socialSignIn, autoLogin } from '../controllers/auth.controller';
import { tokenValidation } from '../libs/verifyToken';
import { PrismaClient } from "@prisma/client"; //AUTOPOST_ONLY_DEVELOPMENT_ROUTE
const router: Router = Router();


router.post('/signup', signup);
router.post('/signin', signin);
// router.get('/localSignIn', tokenValidation, localSignIn);
router.get('/autoLogin', tokenValidation, autoLogin);
// router.get('/socialSignIn', socialSignIn);
// router.get('/wipe', wipe);
// router.get('/profile', tokenValidation, profile);




export default router;






