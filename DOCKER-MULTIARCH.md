# Hướng dẫn xây dựng Docker Image đa kiến trúc (Multi-architecture)

Tài liệu này hướng dẫn cách xây dựng Docker image đa kiến trúc để chạy được trên cả ARM64 (Mac M1/M2) và AMD64 (Ubuntu/các máy chủ Linux thông thường).

## Yêu cầu

- Docker Desktop phiên bản mới hoặc Docker Engine với plugin BuildX
- Docker CLI
- Đã đăng nhập vào Docker Hub (`docker login`)

## Các bước thực hiện

### 1. Kiểm tra BuildX

Đảm bảo bạn đã cài đặt và có thể sử dụng Docker BuildX:

```bash
docker buildx version
```

### 2. Tạo builder mới với hỗ trợ đa nền tảng

```bash
# Tạo builder mới
docker buildx create --name multiarch-builder --use

# Kiểm tra và bootstrap builder
docker buildx inspect --bootstrap
```

### 3. Build và push image đa kiến trúc

```bash
# Di chuyển vào thư mục chứa Dockerfile
cd /đường/dẫn/đến/dự/án

# Build và push với nhiều kiến trúc
docker buildx build --platform linux/amd64,linux/arm64 \
  -t nierdna/ga-telegram-reporter:latest \
  --push .
```

### 4. Kiểm tra image đa kiến trúc

Để xác nhận image đã hỗ trợ nhiều kiến trúc:

```bash
docker manifest inspect nierdna/ga-telegram-reporter:latest
```

## Lưu ý quan trọng

1. **Dockerfile tương thích**: Đảm bảo Dockerfile không chứa lệnh đặc thù cho kiến trúc cụ thể
2. **Base image**: Sử dụng base image có sẵn hỗ trợ đa nền tảng (ví dụ: node:lts)
3. **Dependencies**: Kiểm tra các dependency không có vấn đề tương thích với kiến trúc khác nhau
4. **Thời gian build**: Build đa kiến trúc sẽ mất nhiều thời gian hơn build đơn kiến trúc
5. **Emulation**: BuildX sử dụng QEMU để giả lập các kiến trúc khác với máy host

## Cách kiểm tra triển khai

Sau khi triển khai, người dùng có thể chạy trên bất kỳ nền tảng nào mà không cần thêm flag `--platform`:

```bash
docker run -d \
  --name ga-telegram-reporter \
  --restart unless-stopped \
  -v /path/to/service-account.json:/app/service-account.json \
  -e GA4_PROPERTY_ID=your_property_id \
  -e GA4_SERVICE_ACCOUNT_KEY_PATH=/app/service-account.json \
  -e GA4_WEBSITE_URL=example.com \
  -e TELEGRAM_BOT_TOKEN=your_bot_token \
  -e TELEGRAM_CHAT_ID=your_chat_id \
  -e CRON_SCHEDULE="0 8 * * *" \
  -e TZ=Asia/Ho_Chi_Minh \
  nierdna/ga-telegram-reporter:latest
```

Docker sẽ tự động chọn image phù hợp với kiến trúc của máy chủ. 