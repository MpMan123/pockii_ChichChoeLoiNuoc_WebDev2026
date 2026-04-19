export const validateRequest = (schema) => {
    return (req, res, next) => {
        // Dùng safeParse để kiểm tra mà không bị bung lỗi sập server (throw error)
        const result = schema.safeParse(req.body);
        if (!result.success) {
            // Lọc ra danh sách các lỗi dễ đọc cho Frontend
            const errors = result.error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }));

            return res.status(400).json({
                status: 'fail',
                message: 'Dữ liệu đầu vào không hợp lệ',
                errors: errors
            });
        }

        // Thay thế req.body bằng dữ liệu đã vượt qua bộ lọc (Zod sẽ tự loại bỏ các field thừa không có trong schema)
        req.body = result.data;
        next();
    };
};
