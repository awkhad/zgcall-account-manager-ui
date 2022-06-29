import { ListPlansResponse } from '@fonoster/account-manager/dist/protos'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const usePlans = (queryKey = 'plans') => {
  const { data, isLoading, isSuccess } = useQuery<ListPlansResponse.AsObject>(
    [queryKey],
    async () => (await API.get('/account-manager/plans')).data.data
  )

  const plans = useMemo(() => data?.plansList ?? [], [data])

  return {
    plans,
    isLoading,
    isSuccess,
  }
}
