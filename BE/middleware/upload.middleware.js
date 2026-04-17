import multer from 'multer';

// Cấu hình Multer để lưu file tạm thời vào RAM (Memory) thay vì ổ cứng
// Điều này rất quan trọng vì các server Nodejs (Render, Vercel) thường không cho lưu file lâu dài
const storage = multer.memoryStorage();

// Giới hạn file upload (Ví dụ: chỉ cho phép ảnh, tối đa 5MB)
export const uploadMiddleware = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 Megabytes
    },
    fileFilter: (req, file, cb) => {
        // Chỉ chấp nhận định dạng ảnh
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ được phép tải lên file hình ảnh (JPG, PNG, JPEG...)'), false);
        }
    }
});
