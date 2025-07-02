# GA Telegram Reporter

Ứng dụng tự động gửi báo cáo Google Analytics 4 qua Telegram.

## Yêu cầu

- Docker
- Google Analytics 4 Property ID và Service Account Key
- Telegram Bot Token và Chat ID

## Cách sử dụng nhanh nhất

```bash
docker run -d \
  --name ga-telegram-reporter \
  --restart unless-stopped \
  -v /path/to/service-account.json:/path/to/service-account.json \
  -e GA4_PROPERTY_ID=your_property_id \
  -e GA4_SERVICE_ACCOUNT_KEY_PATH=/path/to/service-account.json \
  -e GA4_WEBSITE_URL=example.com \
  -e TELEGRAM_BOT_TOKEN=your_bot_token \
  -e TELEGRAM_CHAT_ID=your_chat_id \
  -e CRON_SCHEDULE="0 8 * * *" \
  -e TZ=Asia/Ho_Chi_Minh \
  your-docker-username/ga-telegram-reporter:latest
```

## Chuẩn bị

### Tạo Service Account Google

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Kích hoạt Google Analytics API
4. Tạo Service Account với quyền đọc Google Analytics
5. Tạo key cho Service Account (JSON) và tải về
6. Lưu file key vào máy tính

### Tạo Telegram Bot

1. Chat với [@BotFather](https://t.me/BotFather) trên Telegram
2. Tạo bot mới và lấy token
3. Thêm bot vào group hoặc chat trực tiếp với bot
4. Lấy Chat ID bằng cách gửi tin nhắn và truy cập: `https://api.telegram.org/bot<TOKEN>/getUpdates`

## Phương pháp khác: Sử dụng .env file

1. Tạo file `.env`
2. Chạy container:

```bash
docker run -d \
  --name ga-telegram-reporter \
  --restart unless-stopped \
  -v /path/to/service-account.json:/path/to/service-account.json \
  -v $(pwd)/.env:/app/.env \
  -e TZ=Asia/Ho_Chi_Minh \
  your-docker-username/ga-telegram-reporter:latest
```

## Biến môi trường

- **GA4_PROPERTY_ID**: ID của property Google Analytics 4
- **GA4_SERVICE_ACCOUNT_KEY_PATH**: Đường dẫn đến service account key
- **GA4_WEBSITE_URL**: URL của website (mặc định: example.com)
- **TELEGRAM_BOT_TOKEN**: Token của bot Telegram
- **TELEGRAM_CHAT_ID**: ID của chat Telegram
- **CRON_SCHEDULE**: Lịch gửi báo cáo (mặc định: "0 8 * * *" - 8 giờ sáng hàng ngày)

## Kiểm tra logs

```bash
docker logs ga-telegram-reporter
```

## Nguồn và hỗ trợ

Tìm hiểu thêm và đóng góp tại [GitHub Repository](https://github.com/nierdna/ga-telegram-reporter). 