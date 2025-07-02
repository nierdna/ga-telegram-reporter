module.exports = {
  apps: [{
    name: 'ga-baotiendientu',
    script: 'dist/index.js',
    watch: false,
    env: {
      NODE_ENV: 'production',
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    autorestart: true
  }]
}; 