import {
    CreateSaving,
    GetAllSavings,
    GetSavingById,
    MakeDeposit,
    DeleteSaving
} from '../controller/saving.controller.js';
import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { SavingSchema } from '../schema/InputSchema.schema.js';

const savingRouter = Router();

savingRouter.get('/', verifyToken, GetAllSavings);
savingRouter.post('/', validateRequest(SavingSchema), verifyToken, CreateSaving);
savingRouter.get('/:id', verifyToken, GetSavingById);

// Tiet kiem
savingRouter.post('/:id/deposit', validateRequest(SavingSchema), verifyToken, MakeDeposit);
savingRouter.delete('/:id', verifyToken, DeleteSaving);

export default savingRouter;