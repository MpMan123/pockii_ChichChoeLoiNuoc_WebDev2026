CREATE TYPE EXPENSE_NATURE AS ENUM ('Fixed', 'Variable');
CREATE TYPE FREQUENCY_CYCLE AS ENUM ('Daily', 'Weekly', 'Monthly', 'Quarterly');
CREATE TYPE PRIORITY_LEVEL AS ENUM ('Low', 'Medium', 'High', 'Critical');
CREATE TYPE CHALLENGE_TYPE AS ENUM ('PAYMENT_ON_TIME', 'READ_ARTICLE', 'COMPLETE_QUIZ', 'STREAK_BONUS', 'DEBT_REDUCTION_MILESTONE');
CREATE TYPE CURRENCY AS ENUM ('VND', 'USD', 'EUR', 'GBP', 'JPY', 'CNY');
CREATE TYPE TRANSACTION_TYPE AS ENUM ('Income', 'Expense', 'Debt', 'Saving');
CREATE TYPE TRANSACTION_CATEGORY AS ENUM ('Food', 'Transport', 'Salary', 'Bills', 'Other');
CREATE TYPE VERIFICATION_METHOD AS ENUM ('Manual', 'Photo');

CREATE TABLE LEVELS (
    LevelID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    LevelName VARCHAR(50) NOT NULL,
    LevelDescription TEXT,
    RequiredPoints INT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE USERS (
    UserID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    FullName VARCHAR(100),
    AvatarURL TEXT,
    LevelID INT,
    FOREIGN KEY (LevelID) REFERENCES LEVELS(LevelID),
    
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RECURRING_EXPENSES (
    ExpenseID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ExpenseName VARCHAR(100) NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    ExpenseNature EXPENSE_NATURE NOT NULL,
    Frequency FREQUENCY_CYCLE NOT NULL,
    Description TEXT,
    StartDate DATE,
    EndDate DATE,
    
    UserID INT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (UserID) REFERENCES USERS(UserID)
);

-- Lưu các loại thử thách hàng ngày
CREATE TABLE DAILY_CHALLENGES (
    ChallengeID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    -- Tiêu đề nhiệm vụ (Ví dụ: "Ghi chép 1 giao dịch hôm nay", "Đọc 1 bài báo tài chính")
    ChallengeName VARCHAR(255) NOT NULL,
    
    -- Mô tả chi tiết cách thực hiện
    Description TEXT,
    
    -- Số điểm thưởng khi hoàn thành
    Score INTEGER DEFAULT 10,
    
    -- Loại hành động cần thực hiện (để code backend tự động kiểm tra)
    -- Ví dụ: 'READ_ARTICLE', 'ADD_TRANSACTION', 'UPDATE_DEBT'
    ActionType CHALLENGE_TYPE NOT NULL,
    
    -- Ngày áp dụng nhiệm vụ này
    ApplicableDate DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Độ khó (Gamification: Càng khó điểm càng cao)
    DifficultyLevel INTEGER DEFAULT 1, -- 1: Dễ, 2: Trung bình, 3: Khó
    
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ARTICLES (
    ArticleID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Publisher VARCHAR(100),
    ArticleURL VARCHAR(255) NOT NULL,
    Summary TEXT,
    PublishedDate DATE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ATTEMPTS (
    AttemptID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Score INTEGER NOT NULL,
    BonusPoints INTEGER DEFAULT 0,
    CompletedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    ArticleID INT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (ArticleID) REFERENCES ARTICLES(ArticleID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE,

    UNIQUE(ArticleID, UserID)
);

CREATE TABLE CHALLENGE_HISTORIES (
    HistoryID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,    
    -- Loại nhiệm vụ (dùng ENUM đã tạo ở trên)
    ChallengeType CHALLENGE_TYPE NOT NULL,
    
    -- Tên nhiệm vụ cụ thể (Ví dụ: "Thanh toán hóa đơn điện tháng 4")
    ChallengeName VARCHAR(255) NOT NULL,
    
    -- Số điểm nhận được từ nhiệm vụ này
    PointsEarned INTEGER NOT NULL DEFAULT 0,
    
    -- Thời gian hoàn thành nhiệm vụ
    CompletedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Ghi chú thêm (Ví dụ: "Thưởng chuỗi 10 ngày đều đặn")
    Description TEXT,
    
    -- Liên kết với các thực thể liên quan (Optional FKs)
    -- Nếu nhiệm vụ là làm Quiz, trỏ về attempt_id
    AttemptID INT,
    ChallengeID INT,
    UserID INT NOT NULL,
    
    FOREIGN KEY (AttemptID) REFERENCES ATTEMPTS(AttemptID) ON DELETE SET NULL,
    FOREIGN KEY (ChallengeID) REFERENCES DAILY_CHALLENGES(ChallengeID) ON DELETE SET NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE
);

CREATE TABLE BILLS (
    BillID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    BillName VARCHAR(255),
    Amount NUMERIC(15, 2) NOT NULL,
    DueDate DATE NOT NULL,
    FlatInterestRate NUMERIC(6, 4),
    EffectiveInterestRate NUMERIC(6, 4),
    Priority PRIORITY_LEVEL DEFAULT 'Medium',
    IsPaid BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UserID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE
);

CREATE TABLE SAVING_PLANS (
    SavingPlanID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PlanName VARCHAR(100) NOT NULL,
    CurrentTargetAmount DECIMAL(10, 2) NOT NULL,
    FinalTargetAmount DECIMAL(10, 2) DEFAULT 0,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Priority PRIORITY_LEVEL DEFAULT 'Medium',
    
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UserID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE
);

CREATE TABLE ACCOUNTS (
    AccountID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    AccountName VARCHAR(100) NOT NULL,
    AccountType VARCHAR(50) NOT NULL, --ATM, Momo, Bank
    Balance DECIMAL(10, 2) DEFAULT 0,
    Currency CURRENCY DEFAULT 'VND',
    
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UserID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE
);

CREATE TABLE WITHDRAW_FROM (
    WithdrawID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    WithdrawName VARCHAR(100) NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    WithdrawDate DATE NOT NULL,

    AllocatedPercentage DECIMAL(5, 5) NOT NULL, --0.2, 0.24
    AllocatedAmount DECIMAL(10, 2) NOT NULL, --0.2 * 1000000 = 200000
    
    SavingPlanID INT NOT NULL,
    AccountID INT NOT NULL,
    FOREIGN KEY (SavingPlanID) REFERENCES SAVING_PLANS(SavingPlanID) ON DELETE CASCADE,
    FOREIGN KEY (AccountID) REFERENCES ACCOUNTS(AccountID) ON DELETE CASCADE,

    UNIQUE(SavingPlanID, AccountID, WithdrawDate)
);

CREATE TABLE TRANSACTIONS (
    TransactionID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ActualAmount DECIMAL(10, 2) NOT NULL,
    TransactionDate DATE NOT NULL,
    TransactionType TRANSACTION_TYPE NOT NULL, --Income, Expense
    TransactionCategory TRANSACTION_CATEGORY NOT NULL, --Food, Transport, Salary
    TransactionDescription TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    RecordedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    VerificationMethod VERIFICATION_METHOD NOT NULL,
    Priority PRIORITY_LEVEL DEFAULT 'Medium',
    
    UserID INT NOT NULL,
    AccountID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE,
    FOREIGN KEY (AccountID) REFERENCES ACCOUNTS(AccountID) ON DELETE CASCADE
);

CREATE TABLE REPAYMENT_STRATEGIES (
    StrategyID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    StrategyName VARCHAR(100) NOT NULL,
    StrategyDescription TEXT,
    RequiredLevel INT NOT NULL,

    priority_logic TEXT NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,

    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (RequiredLevel) REFERENCES LEVELS(LevelID) ON DELETE CASCADE
);

CREATE TABLE DEBTS (
    DebtID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    DebtName VARCHAR(255) NOT NULL,
    InitialPrincipal NUMERIC(15, 2) NOT NULL,
    CurrentBalance NUMERIC(15, 2) NOT NULL,
    EffectiveInterestRate NUMERIC(6, 4) NOT NULL, 
    
    EstimatedMaturityDate DATE,

    StartDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    EndDate DATE NOT NULL,

    UserID INT NOT NULL,
    StrategyID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE,
    FOREIGN KEY (StrategyID) REFERENCES REPAYMENT_STRATEGIES(StrategyID) ON DELETE CASCADE
);

CREATE TABLE SPONSORS (
    SponsorID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    BrandName VARCHAR(255) NOT NULL,
    Industry VARCHAR(100)
);

CREATE TABLE REWARDS (
    RewardID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    RewardName VARCHAR(255) NOT NULL,
    PointsRequired INT NOT NULL,
    RewardDescription TEXT,
    RewardValue INT NOT NULL, -- Giá trị VNĐ hoac so coin hoac % voucher
    RewardType VARCHAR(50) NOT NULL, --Coin, Voucher, Discount
    VoucherCode VARCHAR(100) UNIQUE NOT NULL,

    IsUsed BOOLEAN DEFAULT FALSE,
    
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ValidFrom DATE NOT NULL,
    ValidTo DATE NOT NULL,

    RequiredLevel INT NOT NULL,
    SponsorID INT NOT NULL,
    FOREIGN KEY (RequiredLevel) REFERENCES LEVELS(LevelID) ON DELETE CASCADE,
    FOREIGN KEY (SponsorID) REFERENCES SPONSORS(SponsorID) ON DELETE CASCADE,

    UNIQUE(RewardID, VoucherCode, SponsorID)
);

CREATE TABLE GET_REWARDS (
    GetRewardID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    GetRewardDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PointsSpent INT NOT NULL,
    
    SponsorID INT NOT NULL,
    RewardID INT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (RewardID) REFERENCES REWARDS(RewardID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE,
    FOREIGN KEY (SponsorID) REFERENCES SPONSORS(SponsorID) ON DELETE CASCADE,

    UNIQUE(RewardID, SponsorID, UserID)
);

CREATE TABLE PARTICIPATE_CHALLENGES (
    ParticipationID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ParticipationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsSolved BOOLEAN DEFAULT FALSE,
    
    AttemptID INT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (AttemptID) REFERENCES ATTEMPTS(AttemptID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE,
    
    UNIQUE(AttemptID, UserID)
);

-- ==========================================
-- INDEXES LẬP THEO QUY TRÌNH (WORKFLOWS)
-- ==========================================

-- Luồng 1: Ghi chép & Phân tích Thu/Chi
CREATE INDEX idx_transactions_user_date ON TRANSACTIONS(UserID, TransactionDate DESC);
CREATE INDEX idx_transactions_category ON TRANSACTIONS(TransactionCategory);

-- Luồng 2: Nhắc nhở Hóa đơn & Quản lý Nợ
CREATE INDEX idx_bills_user_unpaid ON BILLS(UserID, DueDate ASC) WHERE IsPaid = FALSE;
CREATE INDEX idx_debts_user ON DEBTS(UserID);

-- Luồng 3: Gamification - Thử thách & Tích điểm
CREATE INDEX idx_challenge_history_user_completed ON CHALLENGE_HISTORIES(UserID, CompletedAt DESC);
CREATE INDEX idx_daily_challenges_action_date ON DAILY_CHALLENGES(ActionType, ApplicableDate);

-- Luồng 4: Bài báo, Quiz & Đổi thưởng
CREATE INDEX idx_rewards_level ON REWARDS(RequiredLevel);
CREATE INDEX idx_get_rewards_user ON GET_REWARDS(UserID);

-- ==========================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE LEVELS ENABLE ROW LEVEL SECURITY;
ALTER TABLE USERS ENABLE ROW LEVEL SECURITY;
ALTER TABLE RECURRING_EXPENSES ENABLE ROW LEVEL SECURITY;
ALTER TABLE DAILY_CHALLENGES ENABLE ROW LEVEL SECURITY;
ALTER TABLE ARTICLES ENABLE ROW LEVEL SECURITY;
ALTER TABLE ATTEMPTS ENABLE ROW LEVEL SECURITY;
ALTER TABLE CHALLENGE_HISTORIES ENABLE ROW LEVEL SECURITY;
ALTER TABLE BILLS ENABLE ROW LEVEL SECURITY;
ALTER TABLE SAVING_PLANS ENABLE ROW LEVEL SECURITY;
ALTER TABLE ACCOUNTS ENABLE ROW LEVEL SECURITY;
ALTER TABLE WITHDRAW_FROM ENABLE ROW LEVEL SECURITY;
ALTER TABLE TRANSACTIONS ENABLE ROW LEVEL SECURITY;
ALTER TABLE REPAYMENT_STRATEGIES ENABLE ROW LEVEL SECURITY;
ALTER TABLE DEBTS ENABLE ROW LEVEL SECURITY;
ALTER TABLE SPONSORS ENABLE ROW LEVEL SECURITY;
ALTER TABLE REWARDS ENABLE ROW LEVEL SECURITY;
ALTER TABLE GET_REWARDS ENABLE ROW LEVEL SECURITY;
ALTER TABLE PARTICIPATE_CHALLENGES ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- RLS POLICIES
-- Lưu ý quan trọng: Vì cột UserID của bạn là INTEGER, nhưng Supabase mặc định dùng UUID.
-- Policy dưới đây được viết theo thiết kế "Custom JWT", giả định rằng Backend Express của bạn sẽ 
-- tạo token và nhúng ID tự tăng của user vào trường `custom_user_id`.
-- ==========================================

-- 1. Bảng Công Cộng (Mọi Client có thể SELECT, không được Insert/Update ngoại trừ BE gọi bằng Service Key)
CREATE POLICY "Public Read Only for Levels" ON LEVELS FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Daily Challenges" ON DAILY_CHALLENGES FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Articles" ON ARTICLES FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Repayment Strategies" ON REPAYMENT_STRATEGIES FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Sponsors" ON SPONSORS FOR SELECT USING (true);
CREATE POLICY "Public Read Only for Rewards" ON REWARDS FOR SELECT USING (true);

-- 2. Bảng Dữ Liệu Cá nhân (User nào thì chỉ được thao tác trên dòng của User đó)
CREATE POLICY "Isolate Users Data" ON USERS FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Recurring Expenses Data" ON RECURRING_EXPENSES FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Attempts Data" ON ATTEMPTS FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Challenge Histories Data" ON CHALLENGE_HISTORIES FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Bills Data" ON BILLS FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Saving Plans Data" ON SAVING_PLANS FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Accounts Data" ON ACCOUNTS FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Transactions Data" ON TRANSACTIONS FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Debts Data" ON DEBTS FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Get Rewards Data" ON GET_REWARDS FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );
CREATE POLICY "Isolate Participate Challenges Data" ON PARTICIPATE_CHALLENGES FOR ALL USING ( NULLIF(auth.jwt()->>'custom_user_id', '')::INT = UserID );

-- 3. Đặc biệt: Quyền truy cập các bảng rẽ nhánh
CREATE POLICY "Isolate Withdrawals" ON WITHDRAW_FROM FOR ALL USING (
    EXISTS (SELECT 1 FROM SAVING_PLANS WHERE SAVING_PLANS.SavingPlanID = WITHDRAW_FROM.SavingPlanID AND NULLIF(auth.jwt()->>'custom_user_id', '')::INT = SAVING_PLANS.UserID)
);
