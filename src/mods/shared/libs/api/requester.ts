import axios from 'axios'

import { getUserLogged } from '@/mods/auth/hooks/useLoggedIn'
import { Notifier } from '@/mods/shared/components/Notification'

import { getBaseAPI } from '../../helpers/getPath'

const API = axios.create({
  baseURL: getBaseAPI(),
})

API.interceptors.request.use(config => {
  const user = getUserLogged()

  return user
    ? {
        ...config,
        headers: {
          ...config?.headers,
          'X-Access-Key-Id': user.accessKeyId,
          'X-Access-Key-Secret': user.accessKeySecret,
        },
      }
    : config
})

API.interceptors.response.use(
  res => res,
  async err => {
    const message = err.response?.data?.message

    /**
     * @todo Create an error handler based on the messages or codes thrown by the sdk
     */
    if (message) Notifier.error(message)

    return Promise.reject(err)
  }
)

export { API }
