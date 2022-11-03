import getConfig from 'next/config'

type Config = {
  publicRuntimeConfig: {
    [key: string]: string
    APP_URL: string
    SENTRY_DSN: string
    APP_BASE_PATH: string
  }
}

export const { publicRuntimeConfig } = getConfig() as Config

export const config =
  typeof window !== 'undefined'
    ? {
        ...publicRuntimeConfig,
        APP_URL: publicRuntimeConfig.APP_URL || window.location.origin,
      }
    : publicRuntimeConfig
