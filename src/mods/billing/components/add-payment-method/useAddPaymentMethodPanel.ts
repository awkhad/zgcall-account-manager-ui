import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createPanelStore } from '@/mods/shared/hooks/useCreatePanelStore'

const useStore = createPanelStore({
  paymentMethodId: '',
})

export const useAddPaymentMethodPanel = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
