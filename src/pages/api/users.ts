import Fonoster from '@fonoster/sdk'
import { NextApiRequest, NextApiResponse } from 'next'

import { getUserCredentials } from '@/mods/auth/lib/getUserCredentials'
import { requestHandler } from '@/mods/shared/libs/api'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userManager = new Fonoster.Users(await getUserCredentials(req))

  const handlers = {
    get: async () => userManager.getUser(req.query.ref as string),
  }

  return requestHandler({ handlers, req, res })
}
