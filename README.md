# GA Telegram Reporter

Ứng dụng tự động gửi báo cáo Google Analytics 4 qua Telegram.

## Yêu cầu

- Docker
- Google Analytics 4 Property ID
- Google Analytics 4 Service Account Key
- Telegram Bot Token và Chat ID

## Hướng dẫn sử dụng

### 1. Chuẩn bị

#### Tạo Service Account Google

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Kích hoạt Google Analytics API
4. Tạo Service Account với quyền đọc Google Analytics
5. Tạo key cho Service Account (JSON) và tải về
6. Lưu file key vào máy tính của bạn và ghi nhớ đường dẫn đến file

#### Tạo Telegram Bot

1. Chat với [@BotFather](https://t.me/BotFather) trên Telegram
2. Tạo bot mới và lấy token
3. Thêm bot vào group hoặc chat trực tiếp với bot
4. Lấy Chat ID bằng cách gửi tin nhắn và truy cập: `https://api.telegram.org/bot<TOKEN>/getUpdates`

### 2. Triển khai nhanh

#### Phương pháp 1: Sử dụng Docker với .env file

1. Tạo file `.env`:

```bash
# Tạo file .env
cat > .env << EOL
# Google Analytics 4 API
GA4_PROPERTY_ID=your_property_id
GA4_SERVICE_ACCOUNT_KEY_PATH=/path/to/your/service-account.json
GA4_WEBSITE_URL=example.com

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Cron Schedule (Default: 8AM daily)
CRON_SCHEDULE=0 8 * * *

# Proxy (nếu cần)
USE_PROXY=false
SOCKS5_PROXY_URL=
EOL
```

2. Chạy container:

```bash
docker run -d \
  --name ga-telegram-reporter \
  --restart unless-stopped \
  -v /path/to/your/service-account.json:/path/to/your/service-account.json \
  -v $(pwd)/.env:/app/.env \
  -e TZ=Asia/Ho_Chi_Minh \
  nierdna/ga-telegram-reporter:latest
```

Thay `/path/to/your/service-account.json` bằng đường dẫn đầy đủ đến file service account key của bạn.

#### Phương pháp 2: Sử dụng Docker với biến môi trường qua command

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
  nierdna/ga-telegram-reporter:latest
```

Với cách này, bạn không cần tạo file .env vì tất cả các biến môi trường được truyền trực tiếp qua cờ `-e`.

### 3. Kiểm tra logs

```bash
docker logs ga-telegram-reporter
```

### 4. Tùy chỉnh

Bạn có thể điều chỉnh các cài đặt sau trong file `.env` hoặc qua biến môi trường:

- **GA4_WEBSITE_URL**: URL của website (mặc định: example.com)
- **CRON_SCHEDULE**: Lịch gửi báo cáo (mặc định: 0 8 * * * - 8 giờ sáng hàng ngày)

### 5. Dừng và xóa container

```bash
# Dừng container
docker stop ga-telegram-reporter

# Xóa container
docker rm ga-telegram-reporter
```

## Tùy chỉnh lịch gửi báo cáo

Mặc định báo cáo được gửi vào 8 giờ sáng hàng ngày. Để thay đổi lịch, chỉnh sửa cron expression trong file `src/index.ts`:

```typescript
// Format: '0 8 * * *' => 'giây phút giờ ngày tháng'
cron.schedule('0 8 * * *', sendDailyReport);
```

## Đóng góp

Mọi đóng góp đều được đánh giá cao. Vui lòng tạo issue hoặc pull request. 