import { Router } from 'express';
import {
    createBill,
    getAllBills,
    getBillById,
    getBillStatus,
    updateBill
} from '../controller/bill.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { BillSchema, PayBillSchema } from '../schema/InputSchema.schema.js';
const billRouter = Router();

billRouter.get('/bills', verifyToken, getAllBills);
billRouter.post('/bills', validateRequest(BillSchema), verifyToken, createBill);
billRouter.get('/bills/:id', verifyToken, getBillById);

billRouter.put('/bills/:id/pay', validateRequest(PayBillSchema), verifyToken, updateBill);

billRouter.get('/bills/status', verifyToken, getBillStatus);

export default billRouter;