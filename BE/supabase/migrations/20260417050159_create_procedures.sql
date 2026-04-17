-- ==========================================
-- PROCEDURES & TRIGGERS
-- ==========================================

-- Tạo hàm handle_new_user để sync qua public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (UserID, Email, FullName)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Gắn trigger vào bảng auth.users của Supabase
DROP TRIGGER IF EXISTS update_users_on_auth_user ON auth.users;
CREATE TRIGGER update_users_on_auth_user
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Tao ham pay_user_bill
CREATE OR REPLACE FUNCTION public.pay_user_bill(
    p_user_id UUID,
    p_bill_id INT,
    p_account_id INT,
    p_amount DECIMAL
)
RETURNS VOID AS $$
BEGIN
    UPDATE BILLS SET IsPaid = TRUE WHERE BillID = p_bill_id;
    UPDATE ACCOUNTS SET Balance = Balance - p_amount WHERE AccountID = p_account_id;
    
    INSERT INTO TRANSACTIONS (UserID, ActualAmount, TransactionType, TransactionCategory, VerificationMethod, TransactionDescription, Priority, AccountID)
    VALUES (p_user_id, p_amount, 'Expense', 'Bills', 'Manual', 'Paid bill', 'High', p_account_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.make_deposit(
    p_user_id UUID,
    p_saving_id INT,
    p_amount DECIMAL,
    p_account_id INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE ACCOUNTS SET BALANCE = BALANCE - p_amount WHERE AccountId = p_account_id;
    UPDATE SAVING_PLANS SET CurrentTargetAmount = CurrentTargetAmount + p_amount WHERE SavingPlanID = p_saving_id;
    
    INSERT INTO TRANSACTIONS (UserID, ActualAmount, TransactionType, TransactionCategory, VerificationMethod, TransactionDescription, Priority, AccountID)
    VALUES (p_user_id, p_amount, 'Income', 'Savings', 'Manual', 'Deposit to saving plan', 'High', p_account_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
