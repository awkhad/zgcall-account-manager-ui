import { NextPage } from 'next'
import { useEffect } from 'react'

import { useLoggedIn } from '../hooks/useLoggedIn'
import { useRedirect } from '../hooks/useRedirect'

export const Authenticated: NextPage = ({ children }) => {
  const { isLoading, isAuthenticated } = useLoggedIn()
  const { setHasRedirectToChecked, redirectToSignIn, redirectToNextPage } =
    useRedirect()

  useEffect(() => {
    if (isLoading) return

    setHasRedirectToChecked(true)
  }, [
    isLoading,
    isAuthenticated,
    redirectToSignIn,
    redirectToNextPage,
    setHasRedirectToChecked,
  ])

  return <>{children}</>
}
