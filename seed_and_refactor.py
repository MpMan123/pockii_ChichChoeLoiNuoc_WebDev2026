import os

base_path = r"c:\xampp\htdocs\pockii_ChichChoeLoiNuoc_WebDev2026\BE\supabase\migrations"
data_path = os.path.join(base_path, "20260417050228_create_base_data.sql")
out = []

out.append("-- Enable pgcrypto for password hashing in auth")
out.append("CREATE EXTENSION IF NOT EXISTS pgcrypto;")

out.append("\n-- LEVELS")
out.append("INSERT INTO LEVELS (LevelName, LevelDescription, RequiredPoints) VALUES\n('Bronze I', 'Lv1', 0),\n('Bronze II', 'Lv2', 100),\n('Bronze III', 'Lv3', 250),\n('Silver I', 'Lv4', 500),\n('Silver II', 'Lv5', 800),\n('Silver III', 'Lv6', 1200),\n('Gold I', 'Lv7', 2000),\n('Gold II', 'Lv8', 3000),\n('Gold III', 'Lv9', 5000),\n('Platinum I', 'Lv10', 8000),\n('Platinum II', 'Lv11', 12000),\n('Diamond', 'Lv12', 20000);")

uids = [f"e0000000-0000-0000-0000-{str(i).zfill(12)}" for i in range(1, 13)]

out.append("\n-- AUTH USERS AND ROLES (TRIGGERS TO public.USERS)")
for i, uid in enumerate(uids, 1):
    out.append(f"INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token) VALUES\n('00000000-0000-0000-0000-000000000000', '{uid}', 'authenticated', 'authenticated', 'user{i}@gmail.com', crypt('password123', gen_salt('bf')), now(), '{{\"provider\":\"email\",\"providers\":[\"email\"]}}', '{{\"name\": \"User {i}\"}}', now(), now(), '', '', '', '');")

out.append("\n-- SET LEVELS FOR USERS")
out.append("UPDATE USERS SET LevelID = (SELECT LevelID FROM LEVELS ORDER BY random() LIMIT 1);")

out.append("\n-- SPONSORS")
out.append("INSERT INTO SPONSORS (BrandName, Industry) VALUES")
sponsors = [f"('Brand {i}', 'Industry {i}')" for i in range(1, 13)]
out.append(",\n".join(sponsors) + ";")

out.append("\n-- REPAYMENT_STRATEGIES")
out.append("INSERT INTO REPAYMENT_STRATEGIES (StrategyName, StrategyDescription, RequiredLevel, priority_logic) VALUES")
rs = [f"('Strategy {i}', 'Desc {i}', {i}, 'Logic {i}')" for i in range(1, 13)]
out.append(",\n".join(rs) + ";")

out.append("\n-- ACCOUNTS")
out.append("INSERT INTO ACCOUNTS (AccountName, AccountType, Balance, Currency, UserID) VALUES")
acc = [f"('Account {i}', 'Bank', {10000 * i}, 'VND', '{uids[i-1]}')" for i in range(1, 13)]
out.append(",\n".join(acc) + ";")

out.append("\n-- RECURRING_EXPENSES")
out.append("INSERT INTO RECURRING_EXPENSES (ExpenseName, Amount, ExpenseNature, Frequency, UserID) VALUES")
re = [f"('Rent {i}', {1000 * i}, 'Fixed', 'Monthly', '{uids[i-1]}')" for i in range(1, 13)]
out.append(",\n".join(re) + ";")

out.append("\n-- BILLS")
out.append("INSERT INTO BILLS (BillName, Amount, DueDate, UserID) VALUES")
bills = [f"('Water Bill {i}', {100 * i}, CURRENT_DATE + interval '{i} days', '{uids[i-1]}')" for i in range(1, 13)]
out.append(",\n".join(bills) + ";")

out.append("\n-- SAVING_PLANS")
out.append("INSERT INTO SAVING_PLANS (PlanName, CurrentTargetAmount, StartDate, EndDate, UserID) VALUES")
sp = [f"('Laptop {i}', {20000 * i}, CURRENT_DATE, CURRENT_DATE + interval '30 days', '{uids[i-1]}')" for i in range(1, 13)]
out.append(",\n".join(sp) + ";")

out.append("\n-- TRANSACTIONS")
out.append("INSERT INTO TRANSACTIONS (ActualAmount, TransactionDate, TransactionType, TransactionCategory, VerificationMethod, UserID, AccountID) VALUES")
trx = [f"({100 * i}, CURRENT_DATE, 'Income', 'Salary', 'Manual', '{uids[i-1]}', {i})" for i in range(1, 13)]
out.append(",\n".join(trx) + ";")

out.append("\n-- DEBTS")
out.append("INSERT INTO DEBTS (DebtName, InitialPrincipal, CurrentBalance, FlatInterestRate, EndDate, UserID, StrategyID) VALUES")
debts = [f"('Credit Card {i}', {5000 * i}, {5000 * i}, 0.05, CURRENT_DATE + interval '30 days', '{uids[i-1]}', {i})" for i in range(1, 13)]
out.append(",\n".join(debts) + ";")

out.append("\n-- ARTICLES")
out.append("INSERT INTO ARTICLES (Title, ArticleURL) VALUES")
arts = [f"('How to save {i}', 'https://ex.com/{i}')" for i in range(1, 13)]
out.append(",\n".join(arts) + ";")

out.append("\n-- DAILY_CHALLENGES")
out.append("INSERT INTO DAILY_CHALLENGES (ChallengeName, ActionType) VALUES")
actions = ['PAYMENT_ON_TIME', 'READ_ARTICLE', 'COMPLETE_QUIZ', 'STREAK_BONUS', 'DEBT_REDUCTION_MILESTONE']
dc = [f"('Challenge {i}', '{actions[i % 5]}')" for i in range(1, 13)]
out.append(",\n".join(dc) + ";")

out.append("\n-- REWARDS")
out.append("INSERT INTO REWARDS (RewardName, PointsRequired, RewardValue, RewardType, VoucherCode, ValidFrom, ValidTo, RequiredLevel, SponsorID) VALUES")
rw = [f"('Voucher {i}', 100, 50, 'Discount', 'VOUC{str(i).zfill(2)}', CURRENT_DATE, CURRENT_DATE + interval '30 days', {i}, {i})" for i in range(1, 13)]
out.append(",\n".join(rw) + ";")

out.append("\n-- ATTEMPTS")
out.append("INSERT INTO ATTEMPTS (Score, ArticleID, UserID) VALUES")
atm = [f"(100, {i}, '{uids[i-1]}')" for i in range(1, 13)]
out.append(",\n".join(atm) + ";")

out.append("\n-- CHALLENGE_HISTORIES")
out.append("INSERT INTO CHALLENGE_HISTORIES (ChallengeType, ChallengeName, UserID) VALUES")
ch = [f"('{actions[i % 5]}', 'Did task {i}', '{uids[i-1]}')" for i in range(1, 13)]
out.append(",\n".join(ch) + ";")

out.append("\n-- GET_REWARDS")
out.append("INSERT INTO GET_REWARDS (PointsSpent, SponsorID, RewardID, UserID) VALUES")
gr = [f"(100, {i}, {i}, '{uids[i-1]}')" for i in range(1, 13)]
out.append(",\n".join(gr) + ";")

out.append("\n-- WITHDRAW_FROM")
out.append("INSERT INTO WITHDRAW_FROM (WithdrawName, Amount, WithdrawDate, AllocatedPercentage, AllocatedAmount, SavingPlanID, AccountID) VALUES")
wf = [f"('Emergency', 100, CURRENT_DATE - interval '{i} days', 0.1, 100, {i}, {i})" for i in range(1, 13)]
out.append(",\n".join(wf) + ";")

out.append("\n-- PARTICIPATE_CHALLENGES")
out.append("INSERT INTO PARTICIPATE_CHALLENGES (AttemptID, UserID) VALUES")
pc = [f"({i}, '{uids[i-1]}')" for i in range(1, 13)]
out.append(",\n".join(pc) + ";")

with open(data_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(out))
