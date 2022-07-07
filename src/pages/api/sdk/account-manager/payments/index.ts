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
    get: async () => manager.listPaymentMethods({}),
    post: async () =>
      manager.addPaymentMethod({
        paymentMethodId: req.body.paymentMethodId,
      }),
  }

  return requestHandler({ handlers, req, res })
}
