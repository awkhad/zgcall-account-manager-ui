import { AccountManager } from '@fonoster/account-manager'
import { NextApiRequest, NextApiResponse } from 'next'

import { requestHandler } from '@/mods/shared/libs/api'
import { getUserCredentials } from '@/mods/shared/libs/api/getUserCredentials'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manager = new AccountManager(getUserCredentials(req))

  const handlers = {
    get: async () => manager.listPlans({}),
    put: async () => manager.changePlan(req.body),
  }

  return requestHandler({ handlers, req, res })
}
