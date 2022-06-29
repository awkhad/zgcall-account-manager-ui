import { AccountManager } from '@fonoster/account-manager'
import { NextApiRequest, NextApiResponse } from 'next'

import { getUserLogged } from '@/mods/auth/lib/getUserLogged'
import { requestHandler } from '@/mods/shared/libs/api'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manager = new AccountManager({
    ...(await getUserLogged(req)),
    endpoint: '0.0.0.0:50052',
  })

  const handlers = {
    get: async () => manager.getPublishableKey(),
  }

  return requestHandler({ handlers, req, res })
}
