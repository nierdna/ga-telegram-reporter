import * as dotenv from 'dotenv';
import * as cron from 'node-cron';
import { GAInsightsService } from 'ga4-telegram-toolkit';

// Load biến môi trường
dotenv.config();

// Khởi tạo service
const gaInsightsService = new GAInsightsService(
  process.env.GA4_PROPERTY_ID!,
  process.env.GA4_WEBSITE_URL || 'baotiendientu.com',
  process.env.GA4_SERVICE_ACCOUNT_KEY_PATH!
);

async function sendDailyReport() {
  try {
    console.log('Bắt đầu gửi báo cáo GA4 hàng ngày...');
    await gaInsightsService.sendDailyGAInsights();
    console.log('Đã gửi báo cáo GA4 thành công!');
  } catch (error) {
    console.error('Lỗi khi gửi báo cáo GA4:', error);
  }
}

// Cron expression từ biến môi trường hoặc mặc định
const cronSchedule = process.env.CRON_SCHEDULE || '0 8 * * *';
console.log(`Thiết lập cron schedule: ${cronSchedule}`);

// Chạy cronjob với cron expression từ biến môi trường
cron.schedule(cronSchedule, sendDailyReport);

// Test kết nối khi khởi chạy ứng dụng
(async () => {
  try {
    console.log('Kiểm tra kết nối...');
    const isConnected = await gaInsightsService.testConnection();
    if (isConnected) {
      console.log('Kết nối thành công! Đang chạy cronjob...');
      console.log(`Cronjob đã được thiết lập để chạy theo lịch: ${cronSchedule}`);
    } else {
      console.error('Kết nối thất bại. Vui lòng kiểm tra cấu hình.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra kết nối:', error);
    process.exit(1);
  }
})(); 