import { GetPlanResponse } from '@fonoster/account-manager/dist/protos'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const usePlan = (ref?: string, queryKey = 'plan') => {
  const planRef = ref || 'starter'

  const { data, isLoading, isSuccess } = useQuery<GetPlanResponse.AsObject>(
    [queryKey, planRef],
    async () => (await API.get(`/account-manager/${planRef}`)).data.data
  )

  const plan = useMemo(() => data?.plan, [data])

  return {
    plan,
    isLoading,
    isSuccess,
  }
}
