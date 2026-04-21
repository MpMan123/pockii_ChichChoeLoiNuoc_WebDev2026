CREATE TYPE EXPENSE_NATURE AS ENUM ('Fixed', 'Variable');
CREATE TYPE FREQUENCY_CYCLE AS ENUM ('Daily', 'Weekly', 'Monthly', 'Quarterly');
CREATE TYPE PRIORITY_LEVEL AS ENUM ('Low', 'Medium', 'High', 'Critical');
CREATE TYPE CHALLENGE_TYPE AS ENUM ('PAYMENT_ON_TIME', 'READ_ARTICLE', 'COMPLETE_QUIZ', 'STREAK_BONUS', 'DEBT_REDUCTION_MILESTONE');
CREATE TYPE CURRENCY AS ENUM ('VND', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'PERCENT');
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
    UserID UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    Username VARCHAR(50),
    Email VARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15),
    FullName VARCHAR(100),
    AvatarURL TEXT,
    LevelID INT,
    FOREIGN KEY (LevelID) REFERENCES LEVELS(LevelID),

    LastSignInAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastSignOutAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RECURRING_EXPENSES (
    ExpenseID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ExpenseName VARCHAR(100) NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    ExpenseNature EXPENSE_NATURE NOT NULL,
    Frequency FREQUENCY_CYCLE NOT NULL,
    Description TEXT,
    StartDate DATE,
    EndDate DATE,
    
    UserID UUID NOT NULL,
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
    UserID UUID NOT NULL,
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
    UserID UUID NOT NULL,
    
    FOREIGN KEY (AttemptID) REFERENCES ATTEMPTS(AttemptID) ON DELETE SET NULL,
    FOREIGN KEY (ChallengeID) REFERENCES DAILY_CHALLENGES(ChallengeID) ON DELETE SET NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE
);

CREATE TABLE BILLS (
    BillID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    BillName VARCHAR(255),
    Amount NUMERIC(15, 2) NOT NULL,
    DueDate DATE NOT NULL,
    Priority PRIORITY_LEVEL DEFAULT 'Medium',
    IsPaid BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Currency CURRENCY DEFAULT 'VND',

    UserID UUID NOT NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE
);

CREATE TABLE SAVING_PLANS (
    SavingPlanID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PlanName VARCHAR(100) NOT NULL,
    CurrentTargetAmount DECIMAL(18, 2) NOT NULL,
    FinalTargetAmount DECIMAL(18, 2) DEFAULT 0,
    InterestRate NUMERIC(6, 4), -- Lãi suất mỗi năm (nếu có)
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Priority PRIORITY_LEVEL DEFAULT 'Medium',
    
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UserID UUID NOT NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE
);

CREATE TABLE ACCOUNTS (
    AccountID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    AccountName VARCHAR(100) NOT NULL,
    AccountType VARCHAR(50) NOT NULL, --ATM, Momo, Bank
    Balance DECIMAL(18, 2) DEFAULT 0,
    Currency CURRENCY DEFAULT 'VND',
    
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UserID UUID NOT NULL,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE
);

CREATE TABLE WITHDRAW_FROM (
    WithdrawID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    WithdrawName VARCHAR(100) NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    WithdrawDate DATE NOT NULL,

    AllocatedPercentage DECIMAL(5, 5) NOT NULL, --0.2, 0.24
    AllocatedAmount DECIMAL(18, 2) NOT NULL, --0.2 * 1000000 = 200000
    
    SavingPlanID INT NOT NULL,
    AccountID INT NOT NULL,
    FOREIGN KEY (SavingPlanID) REFERENCES SAVING_PLANS(SavingPlanID) ON DELETE CASCADE,
    FOREIGN KEY (AccountID) REFERENCES ACCOUNTS(AccountID) ON DELETE CASCADE,

    UNIQUE(SavingPlanID, AccountID, WithdrawDate)
);

CREATE TABLE TRANSACTIONS (
    TransactionID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ActualAmount DECIMAL(18, 2) NOT NULL,
    TransactionDate DATE NOT NULL,
    TransactionType TRANSACTION_TYPE NOT NULL, --Income, Expense
    TransactionCategory TRANSACTION_CATEGORY NOT NULL, --Food, Transport, Salary
    TransactionDescription TEXT,
    Currency CURRENCY DEFAULT 'VND',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    RecordedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    VerificationMethod VERIFICATION_METHOD NOT NULL,
    Priority PRIORITY_LEVEL DEFAULT 'Medium',
    ProofImageUrl TEXT, -- Lưu trữ link ảnh biên lai/hóa đơn từ Supabase Storage
    
    UserID UUID NOT NULL,
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
    FlatInterestRate NUMERIC(6, 4) NOT NULL, -- Sinh ra do Frontend nhập
    EffectiveInterestRate NUMERIC(6, 4),     -- Có thể tính toán tự động
    Currency CURRENCY DEFAULT 'VND',
    Priority PRIORITY_LEVEL DEFAULT 'Medium',
    EstimatedMaturityDate DATE,

    StartDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    EndDate DATE NOT NULL,

    UserID UUID NOT NULL,
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
    UserID UUID NOT NULL,
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
    UserID UUID NOT NULL,
    FOREIGN KEY (AttemptID) REFERENCES ATTEMPTS(AttemptID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES USERS(UserID) ON DELETE CASCADE,
    
    UNIQUE(AttemptID, UserID)
);

CREATE TABLE economy_indices (
    index_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    index_type VARCHAR(50) NOT NULL, -- Loại chỉ số (ví dụ: CPI, Interest Rate, GDP, Gold)
    index_value DECIMAL(18, 4) NOT NULL, -- Giá trị của chỉ số
    period VARCHAR(20), -- Kỳ báo cáo (ví dụ: Q1/2026, April 2026)
    as_of_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- Thời điểm ghi nhận
    currency_code CURRENCY DEFAULT 'VND',
    relevance_weight DECIMAL(5, 2), -- Trọng số ảnh hưởng AI (0.00 đến 1.00)
    description TEXT -- Mô tả chi tiết thêm
);

CREATE TABLE exchange_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_currency VARCHAR(10) NOT NULL, -- Ví dụ: 'USD', 'EUR', 'BTC'
    to_currency VARCHAR(10) NOT NULL,   -- Thường mặc định là 'VND' hoặc 'USD'
    rate DECIMAL(18, 6) NOT NULL,       -- Tỷ giá (ví dụ: 25350.000000)
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    provider VARCHAR(50),               -- Nguồn lấy tỷ giá (Binance, Vietcombank, v.v.)
    
    UNIQUE(from_currency, to_currency)
);



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
-- TRIGGERS
-- ==========================================

-- Tạo hàm handle_new_user để sync qua public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (UserID, Email, FullName, LevelID)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name', 1);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Gắn trigger vào bảng auth.users của Supabase
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
    -- Update bill status
    UPDATE BILLS
    SET IsPaid = TRUE
    WHERE BillID = p_bill_id;

    -- Update account balance
    UPDATE ACCOUNTS
    SET Balance = Balance - p_amount
    WHERE AccountID = p_account_id;

    -- Insert transaction
    INSERT INTO TRANSACTIONS (
        UserID,
        ActualAmount,
        TransactionType,
        TransactionCategory,
        VerificationMethod,
        TransactionDescription,
        Priority,
        AccountID
    )
    VALUES (
        p_user_id,
        p_amount,
        'Expense',
        'Bills',
        'Manual',
        'Paid bill',
        'High',
        p_account_id
    );
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
    -- Update account balance
    UPDATE ACCOUNTS
    SET BALANCE = BALANCE - p_amount
    WHERE AccountId = p_account_id;

    -- Update saving plan balance
    UPDATE SAVING_PLANS
    SET CurrentAmount = CurrentAmount + p_amount
    WHERE SavingPlanID = p_saving_id;

    -- Insert transaction
    INSERT INTO TRANSACTIONS (
        UserID,
        ActualAmount,
        TransactionType,
        TransactionCategory,
        VerificationMethod,
        TransactionDescription,
        Priority,
        AccountID
    )
    VALUES (
        p_user_id,
        p_amount,
        'Income',
        'Savings',
        'Manual',
        'Deposit to saving plan',
        'High',
        p_account_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;