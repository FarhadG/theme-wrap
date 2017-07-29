const QA = 'qa';
const TEST = 'test';
const INT = 'integration';
const DEV = 'development';
const SANDBOX = 'sandbox';
const PROD = 'production';
const ENV = process.env.NODE_ENV || DEV;

const PORT = Number(process.env.PORT || 8080);

const isQa = (ENV === QA);
const isInt = (ENV === INT);
const isDev = (ENV === DEV);
const isProd = (ENV === PROD);
const isTest = (ENV === TEST);
const isSandbox = (ENV === SANDBOX);

module.exports = {
  PORT, INT, DEV, SANDBOX, PROD, QA, ENV,
  isInt, isDev, isSandbox, isProd, isQa,
  isProduction: isProd,
  isDevelopment: isDev,
  isIntegration: isInt,
  isTest
};
