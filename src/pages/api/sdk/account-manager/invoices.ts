import { AccountManager } from '@fonoster/account-manager'
import { NextApiRequest, NextApiResponse } from 'next'

import { requestHandler } from '@/mods/shared/libs/api'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manager = new AccountManager()

  const handlers = {
    get: async () => manager.listInvoices({}),
  }

  return requestHandler({ handlers, req, res })
}
