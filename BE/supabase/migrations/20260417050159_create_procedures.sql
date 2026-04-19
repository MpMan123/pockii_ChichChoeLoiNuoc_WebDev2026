-- ==========================================
-- PROCEDURES & TRIGGERS
-- ==========================================

-- Tạo hàm handle_new_user để sync qua public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (UserID, Email, FullName, PhoneNumber, LevelID)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'phone', 1);
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



-- Update tai khoan user
CREATE OR REPLACE FUNCTION public.update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE ACCOUNTS SET Balance = Balance + NEW.ActualAmount WHERE AccountID = NEW.AccountID;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE ACCOUNTS SET Balance = Balance - OLD.ActualAmount + NEW.ActualAmount WHERE AccountID = NEW.AccountID;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_account_balance_on_transaction ON TRANSACTIONS;
CREATE TRIGGER update_account_balance_on_transaction
    AFTER INSERT OR UPDATE ON TRANSACTIONS
    FOR EACH ROW EXECUTE PROCEDURE public.update_account_balance();

-- Tinh tong portfolio
CREATE OR REPLACE FUNCTION get_portfolio_total(p_user_id uuid)
RETURNS DECIMAL(18,2) AS $$
DECLARE total_val DECIMAL(18,2);
BEGIN
  SELECT sum(
    CASE 
      WHEN currency = 'VND' THEN balance
      WHEN currency = 'USD' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'USD' AND to_currency = 'VND')
      WHEN currency = 'EUR' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'EUR' AND to_currency = 'VND')
      WHEN currency = 'JPY' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'JPY' AND to_currency = 'VND')
      WHEN currency = 'GBP' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'GBP' AND to_currency = 'VND')
      WHEN currency = 'CNY' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'CNY' AND to_currency = 'VND')
      WHEN currency = 'PERCENT' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'PERCENT' AND to_currency = 'VND')
    END
  )
  INTO total_val
  FROM ACCOUNTS
  WHERE UserID = p_user_id;

  RETURN total_val;
END;
$$ LANGUAGE plpgsql;

-- calculate total debt
CREATE OR REPLACE FUNCTION get_total_debt(p_user_id uuid)
RETURNS DECIMAL(18,2) AS $$
DECLARE total_debt DECIMAL(18,2);
BEGIN
    SELECT sum(
        CASE
            WHEN currency = 'VND' THEN balance
            WHEN currency = 'USD' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'USD' AND to_currency = 'VND')
            WHEN currency = 'EUR' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'EUR' AND to_currency = 'VND')
            WHEN currency = 'JPY' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'JPY' AND to_currency = 'VND')
            WHEN currency = 'GBP' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'GBP' AND to_currency = 'VND')
            WHEN currency = 'CNY' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'CNY' AND to_currency = 'VND')
            WHEN currency = 'PERCENT' THEN balance * (SELECT rate FROM exchange_rates WHERE from_currency = 'PERCENT' AND to_currency = 'VND')
        END
    )
    INTO total_debt
    FROM DEBTS
    WHERE UserID = p_user_id;
    RETURN total_debt;
END;
$$ LANGUAGE plpgsql