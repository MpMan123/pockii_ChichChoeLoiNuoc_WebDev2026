import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js';
import { getAllDebts, createDebt } from '../controller/debt.controller.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { DebtSchema } from '../schema/input.schema.js';
const debtRouter = Router();

debtRouter.get('/', verifyToken, getAllDebts);
debtRouter.post('/', validateRequest(DebtSchema), verifyToken, createDebt);

export default debtRouter;