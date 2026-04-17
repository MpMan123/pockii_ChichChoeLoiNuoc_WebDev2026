-- Enable pgcrypto for password hashing in auth
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- LEVELS
INSERT INTO LEVELS (LevelName, LevelDescription, RequiredPoints) VALUES
('Bronze I', 'Lv1', 0),
('Bronze II', 'Lv2', 100),
('Bronze III', 'Lv3', 250),
('Silver I', 'Lv4', 500),
('Silver II', 'Lv5', 800),
('Silver III', 'Lv6', 1200),
('Gold I', 'Lv7', 2000),
('Gold II', 'Lv8', 3000),
('Gold III', 'Lv9', 5000),
('Platinum I', 'Lv10', 8000),
('Platinum II', 'Lv11', 12000),
('Diamond', 'Lv12', 20000);

-- AUTH USERS AND ROLES (TRIGGERS TO public.USERS)
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'user1@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 1"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'user2@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 2"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated', 'user3@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 3"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated', 'user4@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 4"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated', 'user5@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 5"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000006', 'authenticated', 'authenticated', 'user6@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 6"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000007', 'authenticated', 'authenticated', 'user7@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 7"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000008', 'authenticated', 'authenticated', 'user8@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 8"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000009', 'authenticated', 'authenticated', 'user9@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 9"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000010', 'authenticated', 'authenticated', 'user10@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 10"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000011', 'authenticated', 'authenticated', 'user11@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 11"}', now(), now(), '', '', '', '');
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES
('00000000-0000-0000-0000-000000000000', 'e0000000-0000-0000-0000-000000000012', 'authenticated', 'authenticated', 'user12@gmail.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name": "User 12"}', now(), now(), '', '', '', '');

-- SET LEVELS FOR USERS
UPDATE USERS SET LevelID = (SELECT LevelID FROM LEVELS ORDER BY random() LIMIT 1);

-- SPONSORS
INSERT INTO SPONSORS (BrandName, Industry) VALUES
('Brand 1', 'Industry 1'),
('Brand 2', 'Industry 2'),
('Brand 3', 'Industry 3'),
('Brand 4', 'Industry 4'),
('Brand 5', 'Industry 5'),
('Brand 6', 'Industry 6'),
('Brand 7', 'Industry 7'),
('Brand 8', 'Industry 8'),
('Brand 9', 'Industry 9'),
('Brand 10', 'Industry 10'),
('Brand 11', 'Industry 11'),
('Brand 12', 'Industry 12');

-- REPAYMENT_STRATEGIES
INSERT INTO REPAYMENT_STRATEGIES (StrategyName, StrategyDescription, RequiredLevel, priority_logic) VALUES
('Strategy 1', 'Desc 1', 1, 'Logic 1'),
('Strategy 2', 'Desc 2', 2, 'Logic 2'),
('Strategy 3', 'Desc 3', 3, 'Logic 3'),
('Strategy 4', 'Desc 4', 4, 'Logic 4'),
('Strategy 5', 'Desc 5', 5, 'Logic 5'),
('Strategy 6', 'Desc 6', 6, 'Logic 6'),
('Strategy 7', 'Desc 7', 7, 'Logic 7'),
('Strategy 8', 'Desc 8', 8, 'Logic 8'),
('Strategy 9', 'Desc 9', 9, 'Logic 9'),
('Strategy 10', 'Desc 10', 10, 'Logic 10'),
('Strategy 11', 'Desc 11', 11, 'Logic 11'),
('Strategy 12', 'Desc 12', 12, 'Logic 12');

-- ACCOUNTS
INSERT INTO ACCOUNTS (AccountName, AccountType, Balance, Currency, UserID) VALUES
('Account 1', 'Bank', 10000, 'VND', 'e0000000-0000-0000-0000-000000000001'),
('Account 2', 'Bank', 20000, 'VND', 'e0000000-0000-0000-0000-000000000002'),
('Account 3', 'Bank', 30000, 'VND', 'e0000000-0000-0000-0000-000000000003'),
('Account 4', 'Bank', 40000, 'VND', 'e0000000-0000-0000-0000-000000000004'),
('Account 5', 'Bank', 50000, 'VND', 'e0000000-0000-0000-0000-000000000005'),
('Account 6', 'Bank', 60000, 'VND', 'e0000000-0000-0000-0000-000000000006'),
('Account 7', 'Bank', 70000, 'VND', 'e0000000-0000-0000-0000-000000000007'),
('Account 8', 'Bank', 80000, 'VND', 'e0000000-0000-0000-0000-000000000008'),
('Account 9', 'Bank', 90000, 'VND', 'e0000000-0000-0000-0000-000000000009'),
('Account 10', 'Bank', 100000, 'VND', 'e0000000-0000-0000-0000-000000000010'),
('Account 11', 'Bank', 110000, 'VND', 'e0000000-0000-0000-0000-000000000011'),
('Account 12', 'Bank', 120000, 'VND', 'e0000000-0000-0000-0000-000000000012');

-- RECURRING_EXPENSES
INSERT INTO RECURRING_EXPENSES (ExpenseName, Amount, ExpenseNature, Frequency, UserID) VALUES
('Rent 1', 1000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000001'),
('Rent 2', 2000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000002'),
('Rent 3', 3000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000003'),
('Rent 4', 4000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000004'),
('Rent 5', 5000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000005'),
('Rent 6', 6000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000006'),
('Rent 7', 7000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000007'),
('Rent 8', 8000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000008'),
('Rent 9', 9000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000009'),
('Rent 10', 10000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000010'),
('Rent 11', 11000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000011'),
('Rent 12', 12000, 'Fixed', 'Monthly', 'e0000000-0000-0000-0000-000000000012');

-- BILLS
INSERT INTO BILLS (BillName, Amount, DueDate, UserID) VALUES
('Water Bill 1', 100, CURRENT_DATE + interval '1 days', 'e0000000-0000-0000-0000-000000000001'),
('Water Bill 2', 200, CURRENT_DATE + interval '2 days', 'e0000000-0000-0000-0000-000000000002'),
('Water Bill 3', 300, CURRENT_DATE + interval '3 days', 'e0000000-0000-0000-0000-000000000003'),
('Water Bill 4', 400, CURRENT_DATE + interval '4 days', 'e0000000-0000-0000-0000-000000000004'),
('Water Bill 5', 500, CURRENT_DATE + interval '5 days', 'e0000000-0000-0000-0000-000000000005'),
('Water Bill 6', 600, CURRENT_DATE + interval '6 days', 'e0000000-0000-0000-0000-000000000006'),
('Water Bill 7', 700, CURRENT_DATE + interval '7 days', 'e0000000-0000-0000-0000-000000000007'),
('Water Bill 8', 800, CURRENT_DATE + interval '8 days', 'e0000000-0000-0000-0000-000000000008'),
('Water Bill 9', 900, CURRENT_DATE + interval '9 days', 'e0000000-0000-0000-0000-000000000009'),
('Water Bill 10', 1000, CURRENT_DATE + interval '10 days', 'e0000000-0000-0000-0000-000000000010'),
('Water Bill 11', 1100, CURRENT_DATE + interval '11 days', 'e0000000-0000-0000-0000-000000000011'),
('Water Bill 12', 1200, CURRENT_DATE + interval '12 days', 'e0000000-0000-0000-0000-000000000012');

-- SAVING_PLANS
INSERT INTO SAVING_PLANS (PlanName, CurrentTargetAmount, StartDate, EndDate, UserID) VALUES
('Laptop 1', 20000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000001'),
('Laptop 2', 40000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000002'),
('Laptop 3', 60000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000003'),
('Laptop 4', 80000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000004'),
('Laptop 5', 100000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000005'),
('Laptop 6', 120000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000006'),
('Laptop 7', 140000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000007'),
('Laptop 8', 160000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000008'),
('Laptop 9', 180000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000009'),
('Laptop 10', 200000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000010'),
('Laptop 11', 220000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000011'),
('Laptop 12', 240000, CURRENT_DATE, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000012');

-- TRANSACTIONS
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

-- DEBTS
INSERT INTO DEBTS (DebtName, InitialPrincipal, CurrentBalance, FlatInterestRate, EndDate, UserID, StrategyID) VALUES
('Credit Card 1', 5000, 5000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000001', 1),
('Credit Card 2', 10000, 10000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000002', 2),
('Credit Card 3', 15000, 15000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000003', 3),
('Credit Card 4', 20000, 20000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000004', 4),
('Credit Card 5', 25000, 25000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000005', 5),
('Credit Card 6', 30000, 30000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000006', 6),
('Credit Card 7', 35000, 35000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000007', 7),
('Credit Card 8', 40000, 40000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000008', 8),
('Credit Card 9', 45000, 45000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000009', 9),
('Credit Card 10', 50000, 50000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000010', 10),
('Credit Card 11', 55000, 55000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000011', 11),
('Credit Card 12', 60000, 60000, 0.05, CURRENT_DATE + interval '30 days', 'e0000000-0000-0000-0000-000000000012', 12);

-- ARTICLES
INSERT INTO ARTICLES (Title, ArticleURL) VALUES
('How to save 1', 'https://ex.com/1'),
('How to save 2', 'https://ex.com/2'),
('How to save 3', 'https://ex.com/3'),
('How to save 4', 'https://ex.com/4'),
('How to save 5', 'https://ex.com/5'),
('How to save 6', 'https://ex.com/6'),
('How to save 7', 'https://ex.com/7'),
('How to save 8', 'https://ex.com/8'),
('How to save 9', 'https://ex.com/9'),
('How to save 10', 'https://ex.com/10'),
('How to save 11', 'https://ex.com/11'),
('How to save 12', 'https://ex.com/12');

-- DAILY_CHALLENGES
INSERT INTO DAILY_CHALLENGES (ChallengeName, ActionType) VALUES
('Challenge 1', 'READ_ARTICLE'),
('Challenge 2', 'COMPLETE_QUIZ'),
('Challenge 3', 'STREAK_BONUS'),
('Challenge 4', 'DEBT_REDUCTION_MILESTONE'),
('Challenge 5', 'PAYMENT_ON_TIME'),
('Challenge 6', 'READ_ARTICLE'),
('Challenge 7', 'COMPLETE_QUIZ'),
('Challenge 8', 'STREAK_BONUS'),
('Challenge 9', 'DEBT_REDUCTION_MILESTONE'),
('Challenge 10', 'PAYMENT_ON_TIME'),
('Challenge 11', 'READ_ARTICLE'),
('Challenge 12', 'COMPLETE_QUIZ');

-- REWARDS
INSERT INTO REWARDS (RewardName, PointsRequired, RewardValue, RewardType, VoucherCode, ValidFrom, ValidTo, RequiredLevel, SponsorID) VALUES
('Voucher 1', 100, 50, 'Discount', 'VOUC01', CURRENT_DATE, CURRENT_DATE + interval '30 days', 1, 1),
('Voucher 2', 100, 50, 'Discount', 'VOUC02', CURRENT_DATE, CURRENT_DATE + interval '30 days', 2, 2),
('Voucher 3', 100, 50, 'Discount', 'VOUC03', CURRENT_DATE, CURRENT_DATE + interval '30 days', 3, 3),
('Voucher 4', 100, 50, 'Discount', 'VOUC04', CURRENT_DATE, CURRENT_DATE + interval '30 days', 4, 4),
('Voucher 5', 100, 50, 'Discount', 'VOUC05', CURRENT_DATE, CURRENT_DATE + interval '30 days', 5, 5),
('Voucher 6', 100, 50, 'Discount', 'VOUC06', CURRENT_DATE, CURRENT_DATE + interval '30 days', 6, 6),
('Voucher 7', 100, 50, 'Discount', 'VOUC07', CURRENT_DATE, CURRENT_DATE + interval '30 days', 7, 7),
('Voucher 8', 100, 50, 'Discount', 'VOUC08', CURRENT_DATE, CURRENT_DATE + interval '30 days', 8, 8),
('Voucher 9', 100, 50, 'Discount', 'VOUC09', CURRENT_DATE, CURRENT_DATE + interval '30 days', 9, 9),
('Voucher 10', 100, 50, 'Discount', 'VOUC10', CURRENT_DATE, CURRENT_DATE + interval '30 days', 10, 10),
('Voucher 11', 100, 50, 'Discount', 'VOUC11', CURRENT_DATE, CURRENT_DATE + interval '30 days', 11, 11),
('Voucher 12', 100, 50, 'Discount', 'VOUC12', CURRENT_DATE, CURRENT_DATE + interval '30 days', 12, 12);

-- ATTEMPTS
INSERT INTO ATTEMPTS (Score, ArticleID, UserID) VALUES
(100, 1, 'e0000000-0000-0000-0000-000000000001'),
(100, 2, 'e0000000-0000-0000-0000-000000000002'),
(100, 3, 'e0000000-0000-0000-0000-000000000003'),
(100, 4, 'e0000000-0000-0000-0000-000000000004'),
(100, 5, 'e0000000-0000-0000-0000-000000000005'),
(100, 6, 'e0000000-0000-0000-0000-000000000006'),
(100, 7, 'e0000000-0000-0000-0000-000000000007'),
(100, 8, 'e0000000-0000-0000-0000-000000000008'),
(100, 9, 'e0000000-0000-0000-0000-000000000009'),
(100, 10, 'e0000000-0000-0000-0000-000000000010'),
(100, 11, 'e0000000-0000-0000-0000-000000000011'),
(100, 12, 'e0000000-0000-0000-0000-000000000012');

-- CHALLENGE_HISTORIES
INSERT INTO CHALLENGE_HISTORIES (ChallengeType, ChallengeName, UserID) VALUES
('READ_ARTICLE', 'Did task 1', 'e0000000-0000-0000-0000-000000000001'),
('COMPLETE_QUIZ', 'Did task 2', 'e0000000-0000-0000-0000-000000000002'),
('STREAK_BONUS', 'Did task 3', 'e0000000-0000-0000-0000-000000000003'),
('DEBT_REDUCTION_MILESTONE', 'Did task 4', 'e0000000-0000-0000-0000-000000000004'),
('PAYMENT_ON_TIME', 'Did task 5', 'e0000000-0000-0000-0000-000000000005'),
('READ_ARTICLE', 'Did task 6', 'e0000000-0000-0000-0000-000000000006'),
('COMPLETE_QUIZ', 'Did task 7', 'e0000000-0000-0000-0000-000000000007'),
('STREAK_BONUS', 'Did task 8', 'e0000000-0000-0000-0000-000000000008'),
('DEBT_REDUCTION_MILESTONE', 'Did task 9', 'e0000000-0000-0000-0000-000000000009'),
('PAYMENT_ON_TIME', 'Did task 10', 'e0000000-0000-0000-0000-000000000010'),
('READ_ARTICLE', 'Did task 11', 'e0000000-0000-0000-0000-000000000011'),
('COMPLETE_QUIZ', 'Did task 12', 'e0000000-0000-0000-0000-000000000012');

-- GET_REWARDS
INSERT INTO GET_REWARDS (PointsSpent, SponsorID, RewardID, UserID) VALUES
(100, 1, 1, 'e0000000-0000-0000-0000-000000000001'),
(100, 2, 2, 'e0000000-0000-0000-0000-000000000002'),
(100, 3, 3, 'e0000000-0000-0000-0000-000000000003'),
(100, 4, 4, 'e0000000-0000-0000-0000-000000000004'),
(100, 5, 5, 'e0000000-0000-0000-0000-000000000005'),
(100, 6, 6, 'e0000000-0000-0000-0000-000000000006'),
(100, 7, 7, 'e0000000-0000-0000-0000-000000000007'),
(100, 8, 8, 'e0000000-0000-0000-0000-000000000008'),
(100, 9, 9, 'e0000000-0000-0000-0000-000000000009'),
(100, 10, 10, 'e0000000-0000-0000-0000-000000000010'),
(100, 11, 11, 'e0000000-0000-0000-0000-000000000011'),
(100, 12, 12, 'e0000000-0000-0000-0000-000000000012');

-- WITHDRAW_FROM
INSERT INTO WITHDRAW_FROM (WithdrawName, Amount, WithdrawDate, AllocatedPercentage, AllocatedAmount, SavingPlanID, AccountID) VALUES
('Emergency', 100, CURRENT_DATE - interval '1 days', 0.1, 100, 1, 1),
('Emergency', 100, CURRENT_DATE - interval '2 days', 0.1, 100, 2, 2),
('Emergency', 100, CURRENT_DATE - interval '3 days', 0.1, 100, 3, 3),
('Emergency', 100, CURRENT_DATE - interval '4 days', 0.1, 100, 4, 4),
('Emergency', 100, CURRENT_DATE - interval '5 days', 0.1, 100, 5, 5),
('Emergency', 100, CURRENT_DATE - interval '6 days', 0.1, 100, 6, 6),
('Emergency', 100, CURRENT_DATE - interval '7 days', 0.1, 100, 7, 7),
('Emergency', 100, CURRENT_DATE - interval '8 days', 0.1, 100, 8, 8),
('Emergency', 100, CURRENT_DATE - interval '9 days', 0.1, 100, 9, 9),
('Emergency', 100, CURRENT_DATE - interval '10 days', 0.1, 100, 10, 10),
('Emergency', 100, CURRENT_DATE - interval '11 days', 0.1, 100, 11, 11),
('Emergency', 100, CURRENT_DATE - interval '12 days', 0.1, 100, 12, 12);

-- PARTICIPATE_CHALLENGES
INSERT INTO PARTICIPATE_CHALLENGES (AttemptID, UserID) VALUES
(1, 'e0000000-0000-0000-0000-000000000001'),
(2, 'e0000000-0000-0000-0000-000000000002'),
(3, 'e0000000-0000-0000-0000-000000000003'),
(4, 'e0000000-0000-0000-0000-000000000004'),
(5, 'e0000000-0000-0000-0000-000000000005'),
(6, 'e0000000-0000-0000-0000-000000000006'),
(7, 'e0000000-0000-0000-0000-000000000007'),
(8, 'e0000000-0000-0000-0000-000000000008'),
(9, 'e0000000-0000-0000-0000-000000000009'),
(10, 'e0000000-0000-0000-0000-000000000010'),
(11, 'e0000000-0000-0000-0000-000000000011'),
(12, 'e0000000-0000-0000-0000-000000000012');