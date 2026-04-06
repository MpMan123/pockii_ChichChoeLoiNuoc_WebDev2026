import { Router } from 'express'
import {
  createUser,
  getAllUser,
} from '../controller/user.controller.js'
const userRouter = Router();

/* GET home page. */
userRouter.get('/', getAllUser);

userRouter.post('/create', createUser);

export default userRouter;
