require('dotenv').config()
const path = require('path')
const withPlugins = require('next-compose-plugins')
const withReactSvg = require('next-react-svg')





/** @type {import('next').NextConfig} */

const moduleExports =  withPlugins(
    [
      withReactSvg({
        include: path.resolve(__dirname, 'assets/svg'),
        webpack5: true,
        webpack(config) {
          config.resolve.fallback = { fs: false }
          return config
        }
      }),
    ],
    {
      /* global config here ... */
      include: path.resolve(__dirname, 'assets/images'),
      webpack5: true,
      webpack(config) {
        config.resolve.fallback = { fs: false }
        return config
      },
      reactStrictMode: true,
      distDir: 'build',
      env:{
        BASE_URL_DEV:process.env.BASE_URL_DEV,
        BASE_URL_PROD:process.env.BASE_URL_PROD,
        API_URL_DEV:process.env.API_URL_DEV,
        API_URL_PROD:process.env.API_URL_PROD,
        TLG_BOT_TOKEN:process.env.TLG_BOT_TOKEN,
        TLG_BOT_RECIPIENT_ID:process.env.TLG_BOT_RECIPIENT_ID,
        GOOGLE_ANALYTICS_ID:process.env.GOOGLE_ANALYTICS_ID,
        FACEBOOK_PIXEL_ID:process.env.FACEBOOK_PIXEL_ID
      }
    },
);

module.exports = moduleExports