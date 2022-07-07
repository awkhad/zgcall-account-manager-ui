import axios from 'axios'

import { Notifier } from '@/mods/shared/components/Notification'

import { config } from '../../constants/config'

const API = axios.create({
  baseURL: `${config.APP_URL}/billing/api/sdk`,
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
