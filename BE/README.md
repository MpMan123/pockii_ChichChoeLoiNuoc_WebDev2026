# Hướng dẫn Khởi chạy Supabase Local Development

Dự án này sử dụng cấu trúc cơ sở dữ liệu của PostgreSQL (Supabase) thay vì MySQL. Bằng việc chạy Supabase Local, bạn sẽ có toàn bộ Backend của Supabase (Bao gồm Database, API PostgREST, Studio giao diện trực quan, GoTrue Auth) ngay dưới máy cá nhân của mình.

## 🛠 Điều kiện tiên quyết
1. Cài đặt **Docker Desktop** (hoặc Docker Engine). Phải đảm bảo Docker đang bật và chạy ngầm (icon con cá voi dưới thanh Taskbar).
2. Tắt các hệ thống cũ nếu đang chiếm cổng `:5432` hoặc `:8000` (Ví dụ XAMPP MySQL thì không sao, Postgres thì phải lưu ý).

## 🚀 Các bước khởi chạy Database

### Bước 1: Khởi động hệ thống Supabase Local
Mở terminal tại thư mục `BE` (nếu chưa ở trong đó) và chạy lệnh:
```bash
npx supabase start
```
*Lưu ý: Lần chạy đầu tiên sẽ tốn 2-5 phút để tải toàn bộ các Image (`postgres`, `gotrue`, `realtime`, `studio`...) về máy tính của bạn thông qua Docker.*

*Khi Terminal chạy xong, nó sẽ in ra một danh sách thông tin. Trong đó có các đường link quan trọng, bao gồm:
- **Studio URL:** `http://127.0.0.1:54323` (Trang Web quản lý Data trực quan giống hệt Supabase trên Cloud)
- **API URL:** `http://127.0.0.1:54321` (Link thay cho `SUPABASE_URL` ở trong `.env`)
- **anon key/service_role key:** Khóa thay cho file `.env`*.

### Bước 2: Tự động Seed dữ liệu
Theo cấu trúc chuẩn, khi `supabase start` hoàn thành, hệ thống sẽ tự động quét thư mục `BE/supabase/migrations/` và thực thi file cấu trúc SQL để tọa ra toàn bộ các Table (Users, Transactions, Debts,...) và bộ Index đi kèm.
Bạn chỉ cần truy cập vào **Studio URL** ở trên để tận hưởng thành quả!

### Bước 3: Dừng hệ thống khi code xong
Nếu bạn muốn tắt máy và tiết kiệm RAM, gõ:
```bash
npx supabase stop
```
*Ghi chú: Lệnh stop sẽ giữ nguyên mọi dữ liệu đã lưu. Khi nào cần lại gõ `start` là dữ liệu vẫn ở đó.*

Nếu bạn muốn **Tắt và xóa trắng Data** để test lại từ đầu, gõ thêm cờ này:
```bash
npx supabase stop --no-backup
```
---
> **Chúc bạn code vui vẻ!** Mọi tinh chỉnh hay schema hãy giữ nguyên file Migration để cập nhật đồng bộ nhé!
