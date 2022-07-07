/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/billing',
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
  }
}
