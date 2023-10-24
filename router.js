import Router from 'express';
import AuthController from './src/controllers/AuthController.js';
import { tryCatch } from './src/utils/tryCatch.js';
import ResultController from "./src/controllers/ResultController.js";
import ProfileController from "./src/controllers/ProfileController.js";
import PaymentsController from "./src/controllers/PaymentsController.js";

const router = new Router();

// auth
router.post('/registration', tryCatch(AuthController.registration));
router.post('/login',  tryCatch(AuthController.login));

// roulette
router.post('/result/roulette', tryCatch(ResultController.roulette));

// profile
router.get('/profile/user/:id', tryCatch(ProfileController.getInfoAuthorizedUser));

// balance
router.post('/balance/update', tryCatch(PaymentsController.updateBalance));
router.get('/balance/read', tryCatch(PaymentsController.getBalance));

export default router;
