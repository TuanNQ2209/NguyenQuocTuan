const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();
app.use(express.json());

/** * SỬA LỖI AUTHENTICATION TẠI ĐÂY:
 * Thử dùng chuỗi có tài khoản mặc định của Docker: root / example
 */
// Chuỗi kết nối đã được cập nhật với username: admin và password: password123
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password123@127.0.0.1:27017/inventory_db?authSource=admin';

// Nếu bạn CHẮC CHẮN Docker của mình không đặt mật khẩu, hãy dùng dòng dưới đây:
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inventory_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ DB Connection Error:', err);
        console.log('Mẹo: Kiểm tra lại tài khoản/mật khẩu trong chuỗi MONGO_URI');
    });

// Sử dụng Routes
app.use('/api/inventories', inventoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});