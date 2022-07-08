import { useMemo } from 'react'

import { usePlan } from '@/mods/billing/hooks/usePlan'
import { Storage } from '@/mods/shared/helpers/Storage'
import { useGetUserLogged } from '@/mods/users/hooks/useGetUserLogged'

export const userStore = new Storage('fonoster.user')

export const getUserLogged = () => {
  const userFromStore = userStore.get()

  return userFromStore
    ? (JSON.parse(userFromStore) as {
        accessKeyId: string
        accessKeySecret: string
      })
    : null
}

export const useLoggedIn = () => {
  const session = useMemo(() => getUserLogged(), [])

  const isAuthenticated = useMemo(
    () => Boolean(session && session.accessKeyId && session.accessKeySecret),
    [session]
  )

  const { user } = useGetUserLogged({
    ref: session?.accessKeyId as string,
    enabled: isAuthenticated,
  })

  const { plan } = usePlan(user?.limiter)

  return {
    plan,
    user: {
      name: 'loading...',
      ...user,
    },
    isAuthenticated,
  }
}
