import { config } from '../constants/config'

export const getPath = (path: string) => {
  console.log('FONOSTER: ', config.APP_BASE_PATH, config.APP_URL)

  return path.startsWith('/')
    ? `${config.APP_BASE_PATH}${path}`
    : `${config.APP_BASE_PATH}/${path}`
}

export const getBaseAPI = () => {
  console.log('FONOSTER: ', config.APP_BASE_PATH, config.APP_URL)

  return `${config.APP_URL}${config.APP_BASE_PATH}/api`
}
