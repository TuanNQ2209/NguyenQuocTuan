# Sử dụng Node.js phiên bản ổn định (LTS)
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy các file quản lý thư viện vào trước để tối ưu hóa việc cache
COPY package*.json ./

# Cài đặt các dependencies (thư viện)
RUN npm install --production

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 3000 (đúng với PORT mặc định trong code của bạn)
EXPOSE 3000

# Lệnh để khởi chạy ứng dụng
CMD ["node", "server.js"]