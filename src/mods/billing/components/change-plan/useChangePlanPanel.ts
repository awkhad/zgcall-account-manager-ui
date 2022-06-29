import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createPanelStore } from '@/mods/shared/hooks/useCreatePanelStore'

const useStore = createPanelStore({
  planRef: '',
})

export const useChangePlanPanel = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
