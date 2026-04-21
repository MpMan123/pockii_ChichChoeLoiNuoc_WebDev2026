-- ==========================================
-- RLS POLICIES
-- Đã cập nhật UserID đồng bộ với UUID của auth.users
-- Sử dụng auth.uid() tự nhiên của Supabase
-- ==========================================

-- 1. Bảng Công Cộng (Mọi Client có thể SELECT, không được Insert/Update ngoại trừ BE gọi bằng Service Key)
CREATE POLICY "Public Read Only for Levels" ON LEVELS FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Daily Challenges" ON DAILY_CHALLENGES FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Articles" ON ARTICLES FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Repayment Strategies" ON REPAYMENT_STRATEGIES FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Sponsors" ON SPONSORS FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Rewards" ON REWARDS FOR SELECT USING (true);

-- 2. Bảng Dữ Liệu Cá nhân (User nào thì chỉ được thao tác trên dòng của User đó)
CREATE POLICY "Isolate Users Data" ON USERS FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Isolate Recurring Expenses Data" ON RECURRING_EXPENSES FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Isolate Attempts Data" ON ATTEMPTS FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Isolate Challenge Histories Data" ON CHALLENGE_HISTORIES FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Isolate Bills Data" ON BILLS FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Isolate Saving Plans Data" ON SAVING_PLANS FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Isolate Accounts Data" ON ACCOUNTS FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Isolate Transactions Data" ON TRANSACTIONS FOR ALL USING ( auth.uid() = userid );

CREATE POLICY "Isolate Debts Data" ON DEBTS FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Enable insert for authenticated users" 
ON debts 
FOR INSERT 
WITH CHECK (auth.uid() = userid);

CREATE POLICY "Isolate Get Rewards Data" ON GET_REWARDS FOR ALL USING ( auth.uid() = userid );
CREATE POLICY "Isolate Participate Challenges Data" ON PARTICIPATE_CHALLENGES FOR ALL USING ( auth.uid() = userid );

-- 3. Đặc biệt: Quyền truy cập các bảng rẽ nhánh
CREATE POLICY "Isolate Withdrawals" ON WITHDRAW_FROM FOR ALL USING (
    EXISTS (SELECT 1 FROM SAVING_PLANS WHERE SAVING_PLANS.SavingPlanID = WITHDRAW_FROM.SavingPlanID AND auth.uid() = SAVING_PLANS.userid)
);