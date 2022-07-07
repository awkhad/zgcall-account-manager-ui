import { AccountManager } from '@fonoster/account-manager'
import { NextApiRequest, NextApiResponse } from 'next'

import { requestHandler } from '@/mods/shared/libs/api'
import { getAPICredentials } from '@/mods/shared/libs/api/credentials'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manager = new AccountManager(getAPICredentials())

  const handlers = {
    delete: async () =>
      manager.removePaymentMethod({
        paymentMethodId: req.query.paymentMethodId as string,
      }),
  }

  return requestHandler({ handlers, req, res })
}
