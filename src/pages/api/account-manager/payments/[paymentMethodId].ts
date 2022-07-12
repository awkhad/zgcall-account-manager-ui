import { AccountManager } from '@fonoster/account-manager'
import { NextApiRequest, NextApiResponse } from 'next'

import { requestHandler } from '@/mods/shared/libs/api'
import {
  getServerCredentials,
  getUserCredentials,
} from '@/mods/shared/libs/api/getUserCredentials'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manager = new AccountManager(getServerCredentials())

  const handlers = {
    delete: async () =>
      manager.removePaymentMethod({
        paymentMethodId: req.query.paymentMethodId as string,
        user: getUserCredentials(req),
      }),
    put: async () =>
      manager.setDefaultPaymentMethod({
        paymentMethodId: req.query.paymentMethodId as string,
        user: getUserCredentials(req),
      }),
  }

  return requestHandler({ handlers, req, res })
}
