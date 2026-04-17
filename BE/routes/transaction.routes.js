import { Router } from 'express'
import {
    createTransaction,
    getAllTransactions,
    getTransactionById,
} from '../controller/transaction.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { TransactionSchema } from '../schema/InputSchema.schema.js';

const transactionRouter = Router()

transactionRouter.get('/transactions', verifyToken, getAllTransactions);
transactionRouter.post('/transactions', validateRequest(TransactionSchema), verifyToken, createTransaction);
transactionRouter.get('/transactions/:id', verifyToken, getTransactionById);

export default transactionRouter;