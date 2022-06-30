import {
  AddPaymentMethodRequest,
  AddPaymentMethodResponse,
} from '@fonoster/account-manager/dist/protos'
import { useMutation, useQueryClient } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (paymentMethod: AddPaymentMethodRequest.AsObject) =>
      (await API.post('/account-manager/payments', paymentMethod)).data
        .data as AddPaymentMethodResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('payment_methods')
      },
    }
  )
}
