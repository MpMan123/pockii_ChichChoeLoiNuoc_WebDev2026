# Luồng Xác Thực (Authentication Workflow)

Tài liệu này mô tả kiến trúc xác thực (Authentication) mới an toàn theo tiêu chuẩn, sử dụng `HttpOnly Cookies` để chứa Token, và `AuthContext` (Bộ nhớ Local RAM của React) kết hợp `localStorage` để chứa thông tin hiển thị định danh.

## Sơ đồ hoạt động (Sequence Diagram)

Sơ đồ dưới đây minh họa quá trình một người dùng đăng nhập và yêu cầu lấy dữ liệu bảo mật từ Backend:

```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng
    participant React as Frontend (React / Axios)
    participant AuthContext as Auth Context API
    participant Node as Backend (Express API)
    participant Supabase as Database & Auth

    %% Đăng nhập
    rect rgb(240, 248, 255)
    Note over User, Supabase: VÒNG ĐỜI ĐĂNG NHẬP (LOGIN)
    User->>React: Nhập Email & Password
    React->>Node: POST /api/auth/login { email, password }
    Node->>Supabase: supabase.auth.signInWithPassword()
    Supabase-->>Node: Trả về { session: { access_token }, user: {...} }
    
    %% Kỹ thuật cắm Cookie
    Note right of Node: Backend tạo HttpOnly Cookie<br/>từ access_token. JS không đọc được.
    Node-->>React: Set-Cookie: access_token=xyz (HttpOnly)<br/>JSON Response: { success: true, user: {...} }
    
    %% Lưu trữ an toàn
    React->>AuthContext: loginUser(user) -> Xóa token khỏi localStorage (Nếu có)
    AuthContext->>AuthContext: Lưu "user_info" vào LocalStorage (Chỉ để hiển thị tên)
    AuthContext-->>React: Cập nhật biến State Global { user } 
    React-->>User: Giao diện cập nhật Tên/Avatar (Lấy từ Context)
    end

    %% Gọi API sau đăng nhập
    rect rgb(245, 255, 250)
    Note over User, Supabase: VÒNG ĐỜI TƯƠNG TÁC (GỌI API BẢO MẬT)
    User->>React: Vào trang Dashboard / Tải danh sách Nợ
    React->>Node: GET /api/debt (với { withCredentials: true })
    Note over React, Node: Trình duyệt tự động đính kèm HttpOnly Cookie vào request!
    Node->>Node: verifyToken Middleware đọc req.cookies.access_token
    Node->>Supabase: Gắn Token vào Header để gọi query
    Supabase-->>Node: Kết quả Query
    Node-->>React: Trả về danh sách Nợ Json
    React-->>User: Hiển thị Dữ liệu biểu đồ
    end
```

## Các Dữ Liệu Được Lưu Trữ Ở Đâu?

Đây là phần cấu hình cực kỳ tối ưu về mặt bảo mật hiện tại:

### 1. Ở Trình Duyệt (Frontend)
- **CẤM Ttuyệt Đối:** Không giấu API Keys, access_token ở dạng thô trong LocalStorage.
- **LocalStorage (`user_info`):** Chỉ lưu một Object nhỏ ghi đè Tên (`name`), Email (`email`), Avatar (`avatar`), Role người dùng. Ví dụ: `{"email": "name@gmail.com", "role": "authenticated"}`.
  - *Mục đích:* Khi người dùng F5 tải lại trang, React Context lấy dữ liệu này ra để hiển thị Header ngay lập tức mà không phải chờ Backend. 
- **DOM / Memory (AuthContext):** Biến `const { user } = useAuth();` nằm ở RAM. Khi tab đóng, RAM sẽ được dọn. Khi mở lại, nó lấy lại từ `user_info` ở LocalStorage.

### 2. Ở Nơi Giao Tiếp (Transport Layer)
- **HttpOnly Cookies (`access_token`):** Cái mấu chốt để hệ thống có biết người dùng đã đăng nhập hay chưa? Token này **nằm trong Cookie của trình duyệt** nhưng Javascript không thể chạm vào. Mỗi khi Axios `api.ts` gọi GET/POST, trình duyệt tự động móc Cookie này nhét vào yêu cầu một cách kín đáo vô hình.

### Lợi Ích:
Bạn hoàn toàn bất khả xâm phạm trước **Cross-Site Scripting (XSS)**. Hacker có móc móc LocalStorage thì cũng chỉ biết được Email của bạn, chứ không lấy được Chìa Khóa màng lưới (`access_token`) để tống tiền Database của chúng ta!
