import { Router } from 'express'
import { login, logout, register } from '../controller/auth.controller.js';
const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.post('/register', register);


export default authRouter;
