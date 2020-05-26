import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  IS_PRODUCTION: process.env.PRODUCTION === 'true',
  JWT_KEY: process.env.JWT_KEY,
  TIMEOUT: 86400000,
};
