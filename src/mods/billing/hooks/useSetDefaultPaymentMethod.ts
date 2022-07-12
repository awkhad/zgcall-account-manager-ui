import { SetDefaultPaymentMethodResponse } from '@fonoster/account-manager/dist/protos'
import { useMutation } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const useSetDefaultPaymentMethod = () => {
  return useMutation(
    async (paymentMethodId: string) =>
      (await API.put(`/account-manager/payments/${paymentMethodId}`)).data
        .data as SetDefaultPaymentMethodResponse
  )
}
