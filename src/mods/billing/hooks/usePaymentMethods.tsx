import { ListPaymentMethodResponse } from '@fonoster/account-manager/dist/protos'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const usePaymentMethods = (queryKey = 'payment_methods') => {
  const { data, isLoading, isSuccess } =
    useQuery<ListPaymentMethodResponse.AsObject>(
      [queryKey],
      async () => (await API.get('/account-manager/payments')).data.data
    )

  const paymentMethods = useMemo(() => data?.paymentMethodsList ?? [], [data])

  return {
    paymentMethods,
    isLoading,
    isSuccess,
  }
}
