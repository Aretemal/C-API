import express from 'express';
import cors from 'cors';
import router from './router.js';
import { responseJSON } from './src/middleware/responseJSON.js';
import { tokenMiddleware } from './src/middleware/tokenMiddleware.js';
import {errorHandler} from "./src/middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(tokenMiddleware);
app.use('/api', router);
app.use(responseJSON);
app.use(errorHandler);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => console.log(`Server created on port: ${PORT}`));
