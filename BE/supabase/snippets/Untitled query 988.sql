INSERT INTO TRANSACTIONS (ActualAmount, TransactionDate, TransactionType, TransactionCategory, VerificationMethod, UserID, AccountID) VALUES
(100, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000001', 1),
(200, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000002', 2),
(300, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000003', 3),
(400, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000004', 4),
(500, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000005', 5),
(600, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000006', 6),
(700, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000007', 7),
(800, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000008', 8),
(900, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000009', 9),
(1000, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000010', 10),
(1100, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000011', 11),
(1200, CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000012', 12);

INSERT INTO TRANSACTIONS (ActualAmount, Currency, TransactionDate, TransactionType, TransactionCategory, VerificationMethod, UserID, AccountID) VALUES
(-100000, 'VND', CURRENT_DATE, 'Expense', 'Food', 'Manual', 'e0000000-0000-0000-0000-000000000013', 13),
(200000, 'USD', CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000013', 13),
(300000, 'EUR', CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000013', 13);

INSERT INTO TRANSACTIONS (ActualAmount, Currency, TransactionDate, TransactionType, TransactionCategory, VerificationMethod, UserID, AccountID) VALUES
(300000, 'VND', CURRENT_DATE, 'Income', 'Salary', 'Manual', 'e0000000-0000-0000-0000-000000000013', 13);

SELECT users.userid, transactions.actualamount
FROM transactions 
JOIN users on transactions.userid = users.userid
WHERE email = 'mm@gmail.com'

select * from accounts

select userid
from transactions

select *
from users


SELECT users.userid, users.email, accounts.accountid, accounts.balance
FROM users
JOIN accounts ON users.userid = accounts.useri

select * from accounts

select userid, sum(balance), currency
from accounts
where userid = 'e0000000-0000-0000-0000-000000000013'
group by userid, currency

select userid, sum()

-- 1. Xóa hàm cũ nếu tồn tại (phải đặt ngoài hàm)
DROP FUNCTION IF EXISTS get_portfolio_total(uuid);

-- 2. Tạo hàm mới
CREATE OR REPLACE FUNCTION get_portfolio_total(p_user_id uuid)
RETURNS DECIMAL(18,2) AS $$ -- Dùng 18,2 để tránh tràn số với tiền VND
DECLARE 
    total_val DECIMAL(18,2);
BEGIN
    SELECT sum(
        CASE 
            WHEN currency_code = 'VND' THEN balance
            ELSE balance * COALESCE(
                (SELECT rate FROM exchange_rates 
                 WHERE from_currency = accounts.currency_code 
                 AND to_currency = 'VND' 
                 LIMIT 1), 
                0) -- Nếu không có tỷ giá thì nhân với 0 để tránh lỗi NULL
        END
    )
    INTO total_val
    FROM accounts
    WHERE userid = p_user_id; -- Đảm bảo tên cột đúng (thường là lowercase trong Postgres)

    RETURN COALESCE(total_val, 0); -- Trả về 0 nếu user không có tài khoản nào
END;
$$ LANGUAGE plpgsql;

select userid from users where email = 'mm@gmail.com'

select get_portfolio_total('e0000000-0000-0000-0000-000000000013')
select * from transactions

ALTER TABLE TRANSACTIONS ENABLE ROW LEVEL SECURITY;
select * from bills where userid = 'e0000000-0000-0000-0000-000000000013'

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

ALTER TABLE debts add column currency CURRENCY

select get_total_debt('e0000000-0000-0000-0000-000000000013')
ALTER TABLE DEBTS disable row level security

select * from debts

INSERT INTO DEBTS (DebtName, InitialPrincipal, CurrentBalance, Currency, FlatInterestRate, EndDate, UserID, StrategyID) VALUES
('Credit Card 13', 50000, 50000, 'VND', 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000013', 12),
('Credit Card 14', 55000, 55000, 'VND', 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000013', 1),
('Credit Card 15', 60000, 60000, 'VND', 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000013', 4);

DROP POLICY IF EXISTS "Isolate Debts Data" ON debts;

CREATE POLICY "Isolate Debts Data" ON debts 
FOR ALL 
USING (auth.uid() = userid)
WITH CHECK (auth.uid() = userid);