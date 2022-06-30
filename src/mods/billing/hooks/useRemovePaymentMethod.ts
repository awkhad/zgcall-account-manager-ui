import { RemovePaymentMethodResponse } from '@fonoster/account-manager/dist/protos'
import { useMutation, useQueryClient } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (paymentMethodId: string) =>
      (await API.delete(`/account-manager/payments/${paymentMethodId}`)).data
        .data as RemovePaymentMethodResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('payment_methods')
      },
    }
  )
}
