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

-- Tạo index để truy vấn nhanh hơn theo loại chỉ số và thời gian
CREATE INDEX idx_index_type_date ON economy_indices (index_type, as_of_date);