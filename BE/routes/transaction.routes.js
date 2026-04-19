import { Router } from 'express'
import {
    createTransaction,
    getAllTransactions,
    getTransactionById,
} from '../controller/transaction.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { TransactionSchema } from '../schema/input.schema.js';

const transactionRouter = Router()

transactionRouter.get('/', verifyToken, getAllTransactions);
transactionRouter.post('/', validateRequest(TransactionSchema), verifyToken, createTransaction);
transactionRouter.get('/:id', verifyToken, getTransactionById);

export default transactionRouter;