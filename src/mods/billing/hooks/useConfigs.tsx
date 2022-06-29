import { GetPublishableKeyResponse } from '@fonoster/account-manager/dist/protos'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const useConfigs = (queryKey = 'stripe_configs') => {
  const { data, isLoading, isSuccess } =
    useQuery<GetPublishableKeyResponse.AsObject>(
      [queryKey],
      async () => (await API.get('/account-manager/configs')).data.data
    )

  const publishableKey = useMemo(() => data?.publishableKey ?? [], [data])

  return {
    publishableKey,
    isLoading,
    isSuccess,
  }
}
