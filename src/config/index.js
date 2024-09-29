require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672',
  queue: 'log_application',
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: true, // Use encryption
      enableArithAbort: true
    }
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    retry_strategy: {
      maxRetryTime: 1000 * 60 * 60, // 1 hour
      maxAttempts: 10,
      retryDelay: 3000
    }
  }
};