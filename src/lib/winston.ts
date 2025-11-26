import winston from 'winston';

import config from '@/config';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

// Define the transports array to hold different logging transports
const transports: winston.transport[] = [];

// Add console transport for all environments
if (config.NODE_ENV === 'production') {
  // Production: JSON format for log aggregation services
  transports.push(
    new winston.transports.Console({
      format: combine(timestamp(), json()),
    }),
  );
} else {
  // Development: colorized, human-readable format
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // Add colors to log level
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), // Add timestamp to logs
        align(), // Align log messages
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : '';

          return `${timestamp} [${level}]: ${message}${metaStr}`;
        }),
      ),
    }),
  );
}

// Create a looger instance using Winston
const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info', // Set the default looging level to 'info'
  format: combine(timestamp(), errors({ stack: true }), json()), // Use JSON format for log messages
  transports,
  silent: config.NODE_ENV === 'test', // Disable logging in test environment
});

export { logger };
