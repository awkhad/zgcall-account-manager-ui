import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { NextPage } from 'next'

import { useConfigs } from '@/mods/billing/hooks/useConfigs'
import NotFound from '@/pages/404'
import { Spinner } from '@/ui/Spinner'

import { useLoggedIn } from '../hooks/useLoggedIn'

export const Authenticated: NextPage = ({ children }) => {
  const { isLoading, isAuthenticated } = useLoggedIn()
  const { publishableKey } = useConfigs()

  if (isLoading || !publishableKey) return <Spinner />

  return isAuthenticated ? (
    <>
      <Elements stripe={loadStripe(publishableKey)}>{children}</Elements>
    </>
  ) : (
    <NotFound />
  )
}
