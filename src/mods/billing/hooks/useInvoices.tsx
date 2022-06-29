import { ListInvoicesResponse } from '@fonoster/account-manager/dist/protos'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { API } from '@/mods/shared/libs/api'

export const useInvoices = (queryKey = 'invoices') => {
  const { data, isLoading, isSuccess } =
    useQuery<ListInvoicesResponse.AsObject>(
      [queryKey],
      async () => (await API.get('/account-manager/invoices')).data.data
    )

  const invoices = useMemo(() => data?.invoicesList ?? [], [data])

  return {
    invoices,
    isLoading,
    isSuccess,
  }
}
