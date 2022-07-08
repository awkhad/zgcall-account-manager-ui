import { NextApiRequest } from 'next'

export const getUserCredentials = (req: NextApiRequest) => {
  const credentials = {
    accessKeyId: req.headers['x-access-key-id'] as string,
    accessKeySecret: req.headers['x-access-key-secret'] as string,
    endpoint: process.env.APISERVER_ENDPOINT_DEV,
  }

  if (!credentials.accessKeyId || !credentials.accessKeySecret)
    throw new Error('You do not have permission to access this resource')

  return credentials
}
