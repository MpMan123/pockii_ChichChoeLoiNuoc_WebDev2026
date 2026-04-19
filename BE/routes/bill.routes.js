import { Router } from 'express';
import {
    createBill,
    getAllBills,
    getBillById,
    // getBillStatus,
    updateBill
} from '../controller/bill.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { BillSchema, PayBillSchema } from '../schema/input.schema.js';
const billRouter = Router();

billRouter.get('/', verifyToken, getAllBills);
billRouter.post('/', validateRequest(BillSchema), verifyToken, createBill);
billRouter.get('/:id', verifyToken, getBillById);

billRouter.put('/:id/pay', validateRequest(PayBillSchema), verifyToken, updateBill);

// billRouter.get('/status', verifyToken, getBillStatus);

export default billRouter;