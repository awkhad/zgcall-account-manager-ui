import {
  ChangePlanRequest,
  ChangePlanResponse,
} from '@fonoster/account-manager/dist/protos'
import { useMutation, useQueryClient } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const useChangePlan = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (plan: ChangePlanRequest.AsObject) =>
      (await API.put('/account-manager/plans', plan)).data
        .data as ChangePlanResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('users')
      },
    }
  )
}
