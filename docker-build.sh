#!/bin/bash

# Cấu hình
IMAGE_NAME="ga-telegram-reporter"
VERSION="1.0.0"
DOCKER_USERNAME="nierdna"  # Thay đổi thành username Docker của bạn

# Build image
echo "Building Docker image: $IMAGE_NAME:$VERSION"
docker build -t $IMAGE_NAME:$VERSION .
docker tag $IMAGE_NAME:$VERSION $IMAGE_NAME:latest

# Tùy chọn: Push lên Docker Hub
echo "Bạn có muốn push image lên Docker Hub không? (y/n)"
read answer

if [ "$answer" = "y" ]; then
  echo "Đăng nhập vào Docker Hub"
  docker login
  
  echo "Push image lên Docker Hub"
  docker tag $IMAGE_NAME:$VERSION $DOCKER_USERNAME/$IMAGE_NAME:$VERSION
  docker tag $IMAGE_NAME:$VERSION $DOCKER_USERNAME/$IMAGE_NAME:latest
  
  docker push $DOCKER_USERNAME/$IMAGE_NAME:$VERSION
  docker push $DOCKER_USERNAME/$IMAGE_NAME:latest
  
  echo "Hoàn tất push image lên Docker Hub"
  echo "Người dùng có thể sử dụng image của bạn với lệnh:"
  echo "docker run -d --name ga-telegram-reporter --restart unless-stopped -v /path/to/service-account.json:/path/to/service-account.json -v \$(pwd)/.env:/app/.env -e TZ=Asia/Ho_Chi_Minh $DOCKER_USERNAME/$IMAGE_NAME:latest"
fi

echo "Quá trình build hoàn tất" 