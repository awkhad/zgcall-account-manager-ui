import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { NextPage } from 'next'

import { useConfigs } from '@/mods/billing/hooks/useConfigs'
import { Container, Title } from '@/ui'
import { Spinner } from '@/ui/Spinner'

import { useLoggedIn } from '../hooks/useLoggedIn'

export const NotUserLogged = () => (
  <Container>
    <Title>401 Unauthorized — This page could not be found.</Title>
  </Container>
)

export const Authenticated: NextPage = ({ children }) => {
  const { isAuthenticated } = useLoggedIn()
  const { publishableKey } = useConfigs()

  if (!publishableKey) return <Spinner />

  return isAuthenticated ? (
    <>
      <Elements stripe={loadStripe(publishableKey)}>{children}</Elements>
    </>
  ) : (
    <NotUserLogged />
  )
}
