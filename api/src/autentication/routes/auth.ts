import { Router } from 'express';
import { signup, signin, profile, wipe } from '../controllers/auth.controller';
import { tokenValidation } from '../libs/verifyToken';
// import { tokenValidation } from '../libs/verifyToken'

const router: Router = Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/wipe', wipe);
router.get('/profile', tokenValidation, profile);





export default router;