import { GetServerSideProps } from 'next'
import { getCsrfToken, getSession } from 'next-auth/react'
import { useLayoutEffect } from 'react'
import { dehydrate } from 'react-query'

import { useLoggedIn } from '@/mods/auth/hooks/useLoggedIn'
import { useTitle } from '@/mods/shared/hooks/useTitle'
import { getQueryClient } from '@/mods/shared/libs/queryClient'
import { Text, Title } from '@/ui'

export function Account() {
  const { setTitle } = useTitle()
  const { user } = useLoggedIn()

  useLayoutEffect(() => {
    setTitle(user?.name || 'Me')
  }, [setTitle, user])

  return (
    <>
      <div className="flex-1 relative flex overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none xl:order-first">
          <div className="absolute inset-0">
            <div>
              <div>
                <Title level={4} className="leading-6 m-0">
                  Account details
                </Title>
                <br />
                <Text>User Data: {JSON.stringify(user, null, 2)}</Text>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const csrfToken = await getCsrfToken({ req })
  const queryClient = getQueryClient()

  console.log('TEST - GET SESSION: ', session)
  console.log('TEST - GET CSRF TOKEN: ', csrfToken)

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

Account.isProtected = true

export default Account
