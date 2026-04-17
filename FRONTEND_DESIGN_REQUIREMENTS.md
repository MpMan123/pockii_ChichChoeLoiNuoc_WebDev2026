# Yêu cầu Thiết kế Giao diện Frontend (UI/UX Requirements)
Dự án: **Chích Chòe Lội Nước (Quản lý Tài chính cá nhân)**

Tài liệu này cung cấp chi tiết các trường dữ liệu (fields) cần thiết trên form và quy định về dữ liệu đầu vào dựa trên Database Schema thực tế để team Frontend thực hiện thiết kế UI.

---

## 1. Authentication (Đăng nhập & Đăng ký)

### Ánh xạ CSDL: bảng `USERS`

*   **Màn hình Đăng ký (Register):**
    *   `Tên hiển thị` (FullName) - *Bắt buộc* (Input Text)
    *   `Email` - *Bắt buộc* (Input Email)
    *   `Mật khẩu` - *Bắt buộc* (Input Password)
    *   `Xác nhận mật khẩu` - *Bắt buộc* (Input Password)
*   **Màn hình Đăng nhập (Login):**
    *   `Email` - *Bắt buộc* (Input Email)
    *   `Mật khẩu` - *Bắt buộc* (Input Password)
*   **Màn hình Thiết lập ban đầu (Onboarding - Sau khi đăng ký):**
    *   Tạo Ví/Tài khoản đầu tiên (Gắn vào bảng `ACCOUNTS`):
        *   `Tên ví` (AccountName) - VD: Tiền mặt, Thẻ Vietcombank
        *   `Loại ví` (AccountType) - *Mặc định*: "ATM", "Momo", "Bank"
        *   `Tiền tệ` (Currency) - *Dropdown*: "VND", "USD", "EUR", "GBP", "JPY", "CNY"
        *   `Số dư ban đầu` (Balance) - *Input Number*

---

## 2. Quản lý Thu/Chi (Transactions) & AI Input

### Ánh xạ CSDL: bảng `TRANSACTIONS`

*   **Tính năng: Nhập nhanh bằng Text/Giọng nói (AI hỗ trợ)**
    *   *Giao diện chính*: Chỉ có 1 ô Input Text Area lớn hoặc nút bấm thu âm thu giọng nói. (VD: "Hôm qua đi siêu thị mua đồ ăn hết 200k tiền mặt").
*   **Card/Modal Xác nhận giao dịch (Sau khi AI phân tích):**
    *   Hiển thị dưới dạng một form đã điền sẵn dữ liệu để người dùng kiểm tra:
    *   `Số tiền` (ActualAmount) - *Input Number* (Bắt buộc)
    *   `Loại giao dịch` (TransactionType) - *Dropdown/Radio*: "Income", "Expense", "Debt", "Saving"
    *   `Danh mục` (TransactionCategory) - *Dropdown*: "Food", "Transport", "Salary", "Bills", "Other"
    *   `Nguồn tiền / Ví` (AccountID) - *Dropdown* (Chọn từ danh sách `ACCOUNTS`)
    *   `Ngày giao dịch` (TransactionDate) - *Date Picker*
    *   `Ghi chú` (TransactionDescription) - *Text Area*
    *   `Mức độ lưu ý` (Priority) - *Dropdown*: "Low", "Medium" (Mặc định), "High", "Critical.
    *   `Ảnh minh chứng` (ProofImageUrl) - Nút Upload ảnh biên lai (VerificationMethod sẽ tự động tính là 'Photo' hoặc 'Manual').

---

## 3. Quản lý Hóa đơn & Nợ (Bills & Debts)

### Ánh xạ CSDL: bảng `BILLS`, `DEBTS`, `REPAYMENT_STRATEGIES`

*   **Tạo Hóa đơn (Bills) - (VD: Tiền nhà, tiền điện):**
    *   `Tên hóa đơn` (BillName) - *Input Text* (Bắt buộc)
    *   `Số tiền` (Amount) - *Input Number* (Bắt buộc)
    *   `Ngày đến hạn` (DueDate) - *Date Picker* (Bắt buộc)
    *   `Mức độ ưu tiên` (Priority) - *Dropdown/Tag*: "Low", "Medium" (Mặc định), "High", "Critical". (UI nên thiết kế dạng Label màu sắc: Đỏ là Critical, Cam là High...).
*   **Tạo Khoản Nợ (Debts):**
    *   `Tên khoản nợ` (DebtName) - *Input Text* (Bắt buộc)
    *   `Tổng số tiền nợ` (InitialPrincipal) - *Input Number* (Bắt buộc)
    *   `Ngày bắt đầu` (StartDate) - *Date Picker* (Mặc định là hôm nay)
    *   `Ngày kết thúc/Ngày đáo hạn dự kiến` (EndDate / EstimatedMaturityDate) - *Date Picker*
    *   `Lãi suất` (FlatInterestRate) - *Input Number (%)*
    *   `Chiến lược trả nợ` (StrategyID) - *Dropdown* (Hiển thị các chiến lược từ bảng Strategy).

---

## 4. Quản lý Tiết kiệm theo mục tiêu (Saving Plans)

### Ánh xạ CSDL: bảng `SAVING_PLANS`

*   **Tạo Mục tiêu tiết kiệm:**
    *   `Tên mục tiêu` (PlanName) - *Input Text* (Bắt buộc)
    *   `Số tiền mục tiêu` (FinalTargetAmount) - *Input Number* (Bắt buộc)
    *   `Số tiền đã có` (CurrentTargetAmount) - *Input Number*, mặc định là 0.
    *   `Ngày bắt đầu` (StartDate) - *Date Picker*
    *   `Ngày dự kiến hoàn thành` (EndDate) - *Date Picker*
    *   `Lãi suất mục tiêu` (InterestRate) - *Input Number* (Có thể ẩn nếu tiết kiệm heo đất thông thường)
    *   `Chế độ ưu tiên` (Priority) - *Dropdown*: "Low", "Medium", "High", "Critical".

*(Chú ý Frontend: Nếu người dùng không biết EndDate, có thể yêu cầu họ nhập số tiền có thể tiết kiệm mỗi tháng và ngược lại. Có thể thêm 1 nút Switch "Sử dụng AI tính toán lộ trình tiết kiệm").*

---

## 5. Gamification (Hệ thống Trò chơi hóa - Điểm, Cấp độ, Thử Thách & Học thuật)

Hệ thống Gamification được thiết kế với mục đích lôi kéo người dùng quay trở lại app hàng ngày thông qua Điểm danh, Thăng cấp, và Đọc báo/Học tài chính.

### 5.1. Điểm danh hàng ngày & Chuỗi ngày (Daily Check-in & Streaks)
*   **Luồng Hoạt động:** Người dùng mở app mỗi ngày và bấm "Điểm danh", nếu duy trì chuỗi (streak) 3 ngày, 7 ngày sẽ được nhận Điểm Bonus.
*   **Màn hình Điểm danh:**
    *   `Trạng thái chuỗi ngày` (Streak Count) - UI: Biểu tượng ngọn lửa kèm số ngày (Dựa vào lịch sử trong bảng `CHALLENGE_HISTORIES`).
    *   `Lịch điểm danh tuần` - UI: Bảng lịch 7 ngày, ngày đã điểm danh nổi bật với dấu tick xanh (Read-only UI).
    *   Nút `Điểm danh nhận quà` - Nút nhấn lớn gọi API, kèm hiệu ứng Animation (Animation Lottie: Tiền rơi rơi hoặc Pháo hoa).

### 5.2. Hệ thống Thăng cấp (Level Up System)
*Ánh xạ CSDL: bảng `LEVELS`, `USERS`*
*   **Thanh tiến trình Cấp độ (Level Progress Bar):**
    *   Nên đặt cố định trên Header của ứng dụng (Trang chủ/Dashboard).
    *   `Cấp độ hiện hành` (LevelName hiện tại) - VD: "Tân binh", "Chuyên gia tài chính".
    *   `Thanh Progress Progress` - Tính toán tỷ lệ % : `Tổng điểm hiện tại` / `RequiredPoints`. 
    *   `Popup Thăng cấp` - Modal xuất hiện ngay khi user đủ điểm. (Gợi ý: Cấp độ càng cao, app sẽ mở khóa thêm tính năng ẩn như Đổi Voucher siêu giảm giá tại màn hình Rewards).

### 5.3. Trung tâm Khám phá (Đọc báo & Làm Quiz lấy điểm)
*   **Danh sách Bài báo (Articles List):**
    *   Thể hiện dạng UI Card (Thumbnail, Title, Publisher, PublishedDate). Phía trên nhãn ghi: **Quà: +50 Điểm**.
*   **Màn hình đọc chi tiết & Mở khóa Quiz:**
    *   Đọc text chi tiết tại App.
    *   **Nút "Kiểm tra kiến thức (Làm Quiz)"** bị mờ (Disabled) trong 30 giây đầu. Frontend sẽ chèn 1 thanh chạy thời gian. Khi đủ 30 giây, nút bừng sáng kèm hiệu ứng rung rinh để kích thích click.
*   **Màn hình Làm Quiz (Trắc nghiệm):**
    *   Câu hỏi hiển thị lần lượt từng dòng.
    *   Sử dụng UI: Radio Button cho 4 đáp án (A, B, C, D).
    *   Có thanh đếm ngược thời gian *(ví dụ 10 giây cho từng câu)* để tạo áp lực vui vẻ.
    *   `Kết thúc Quiz`: Hiện bảng tổng kết (Lưu vào `ATTEMPTS`). VD: "Bạn đúng 4/5 câu. Bạn được thưởng +40 Điểm!". Có nút `Về trang chủ` hoặc `Khám phá bài mớI`.

### 5.4. Thử thách hàng ngày khác (Daily Challenges)
*   Hiển thị danh sách card gồm các nhiệm vụ được gán `ActionType` từ Backend:
    *   VD: Thử thách "Thanh toán nợ đúng hạn" (`PAYMENT_ON_TIME`).
    *   Nút trạng thái: `Thực hiện ngay` (Dẫn link đến màn hình trả nợ) hoặc `Nhận thưởng` (Khi BE xác định đã hoàn thành).

---

## 6. Đề xuất biến động chi tiêu (Recurring Expenses & AI Config)

### Ánh xạ CSDL: bảng `RECURRING_EXPENSES`

*   **Cài đặt các khoản thu/chi cố định (Để AI dự báo dòng tiền tháng tới):**
    *   `Tên khoản` (ExpenseName) - *Input Text* (VD: Tiền trọ, Tiền lương)
    *   `Số tiền` (Amount) - *Input Number*
    *   `Tính chất` (ExpenseNature) - *Toggle/Radio*: "Fixed" (Cố định, VD: Tiền nhà), "Variable" (Biến đổi, VD: Tiền điện, nước).
    *   `Chu kỳ` (Frequency) - *Dropdown*: "Daily", "Weekly", "Monthly", "Quarterly".
*   **Màn hình Alert/Gợi ý từ AI:**
    *   Sử dụng UI dạng Notification / Alert Card: "Thu nhập tháng này của bạn rủng rỉnh hơn, AI đề xuất tăng mức gửi tiết kiệm lên 20%". Hiển thị kèm nút `Chấp nhận` / `Từ chối`.
