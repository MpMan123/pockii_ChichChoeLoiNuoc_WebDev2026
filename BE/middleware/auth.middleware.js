import supabase from '../config/supabase.js';

export const verifyToken = async (req, res, next) => {
    try {
        // 1. Lấy token từ header Authorization của request
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'fail',
                message: 'Vui lòng cung cấp token đăng nhập (Bearer token)'
            });
        }

        const token = authHeader.split(' ')[1];

        // 2. Sử dụng Supabase để xác thực token này
        const { user, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Token không hợp lệ hoặc đã hết hạn'
            });
        }

        // 3. Gắn thông tin user lấy được vào req.user để các controller phía sau sử dụng được
        req.user = data.user;

        // 4. Cho phép đi tiếp vào Controller (ví dụ getAllTransactions)
        next();
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Lỗi xác thực: ' + error.message
        });
    }
};


