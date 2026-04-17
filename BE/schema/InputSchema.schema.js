import { z } from "zod";

export const TransactionSchema = z.object({
    user_id: z.string().uuid(),
    ActualAmount: z.number().positive(),
    TransactionType: z.enum(['Income', 'Expense', 'Debt', 'Saving']),
    TransactionCategory: z.enum(['Food', 'Transport', 'Salary', 'Bills', 'Other']),
    VerificationMethod: z.enum(['API', 'Manual', 'Photo']),
    TransactionDescription: z.string().optional(),
    Priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
    ProofImageUrl: z.string().url("Link ảnh không hợp lệ").optional(), // Thêm định dạng url ảnh (không bắt buộc)
});

export const AccountSchema = z.object({
    user_id: z.string().uuid(),
    AccountName: z.string(),
    AccountType: z.enum(['Bank', 'Cash', 'Credit Card']),
    Balance: z.number().optional(),
    Currency: z.enum(['VND', 'USD', 'EUR', 'GBP', 'JPY', 'CNY']).optional(),
    Status: z.enum(['Active', 'Inactive']).optional(),

});

export const BillSchema = z.object({
    userid: z.string().uuid(),
    billname: z.string(),
    amount: z.number().positive(),
    dueDate: z.string().transform((val) => new Date(val)),
    category: z.enum(['Food', 'Transport', 'Salary', 'Bills', 'Other']),
    isPaid: z.boolean().default(false),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']).default('Medium'),
});

// Schema riêng dành cho việc Thanh Toán Hóa Đơn
export const PayBillSchema = z.object({
    accountId: z.number({ required_error: "Vui lòng chọn tài khoản để thanh toán" }).positive(),
});
