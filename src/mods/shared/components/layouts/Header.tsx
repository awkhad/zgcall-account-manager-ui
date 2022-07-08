import { HomeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { useLoggedIn } from '@/mods/auth/hooks/useLoggedIn'
import { Title } from '@/ui'

import { config } from '../../constants/config'
import { classes } from '../../helpers/classes'
import { getPath } from '../../helpers/getPath'
import { Notification } from '../Notification'

const navs = [
  {
    href: '/account',
    label: 'Account',
  },
  {
    href: '/',
    label: 'Bills',
  },
  {
    href: '/payment-methods',
    label: 'Payment methods',
  },
]

export const Header = () => {
  const { user } = useLoggedIn()
  const { pathname } = useRouter()

  return (
    <>
      <Notification />
      <nav className="bg-gray-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block h-8 w-auto"
                  src={getPath('isotipo.svg')}
                  alt="Fonoster"
                />
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <Link href={config.APP_URL}>
                <a className="flex items-center text-gray-300 hover:text-primary">
                  <HomeIcon className="w-6 h-6 mr-2" />

                  <span>Go to console</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center pt-10">
          <div className="flex-shrink-0">
            <span className="sr-only">Open user menu</span>
            {user?.avatar && (
              <img
                className="h-20 w-20 rounded-full"
                src={user?.avatar}
                alt=""
              />
            )}
          </div>
          <div className="ml-3">
            <Title level={3}>{user?.name}</Title>
          </div>
        </div>

        <div className="w-full mx-auto border-b border-gray-500">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="-mb-px flex space-x-4">
                {navs.map(item => (
                  <Link href={item.href} key={item.href}>
                    <a
                      className={classes(
                        pathname === item.href
                          ? 'border-primary text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          : 'border-transparent text-gray-400 hover:border-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
