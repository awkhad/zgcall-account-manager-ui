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
    endpoint: process.env.AM_SERVER_ENDPOINT,
  })

  const handlers = {
    get: async () => manager.listPlans({}),
    put: async () => manager.changePlan(req.body),
  }

  return requestHandler({ handlers, req, res })
}