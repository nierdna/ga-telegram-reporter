#!/bin/bash

echo "🔄 Đang cập nhật từ git..."
git pull

echo "📦 Đang cài đặt các gói phụ thuộc..."
npm install

echo "🛠️ Đang build ứng dụng..."
npm run build

echo "🚀 Đang khởi động lại ứng dụng với PM2..."
pm2 restart ga-baotiendientu

echo "✅ Hoàn tất! Ứng dụng đã được cập nhật và khởi động lại." 