import Router from 'express';
import AuthController from './src/controllers/AuthController.js';
import { tryCatch } from './src/utils/tryCatch.js';
import ResultController from "./src/controllers/ResultController.js";

const router = new Router();

// auth
router.post('/registration', tryCatch(AuthController.registration));
router.post('/login',  tryCatch(AuthController.login));

router.post('/result/roulette', tryCatch(ResultController.roulette))

export default router;
