import { Menu, Transition } from '@headlessui/react'
import {
  DotsHorizontalIcon,
  PhoneIcon,
  StatusOfflineIcon,
} from '@heroicons/react/outline'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Fragment, useCallback, useLayoutEffect, useState } from 'react'
import { dehydrate } from 'react-query'

import type { AppPage } from '@/@types'
import { DeleteResource } from '@/mods/shared/components/DeleteResource'
import { Notifier } from '@/mods/shared/components/Notification'
import { classes } from '@/mods/shared/helpers/classes'
import { useTitle } from '@/mods/shared/hooks/useTitle'
import { CallSessionState } from '@/mods/shared/libs/CallSessionState'
import { getQueryClient } from '@/mods/shared/libs/queryClient'
import { Button, Spinner, Text, Title } from '@/ui'

import { useCreationEditingNumber } from '../../components/creation-editing'
import { useDeleteNumber } from '../../hooks/useDeleteNumber'
import { useNumbers } from '../../hooks/useNumbers'
import { NoNumbers } from './NoNumbers'

export const NumbersBoard: AppPage = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const { mutate, isLoading } = useDeleteNumber()
  const [deleteRef, setDeleteRef] = useState('')
  const { setTitle } = useTitle()
  const { numbers, isSuccess } = useNumbers()

  const { openEditing } = useCreationEditingNumber()

  const [wphone, setPhoneInstance] = useState<any>(null)

  useLayoutEffect(() => {
    setTitle('SIP Network')
  }, [setTitle])

  const onTestCall = useCallback(async (e164Number: string) => {
    Notifier.info('Test Call in progress...', { closeButton: false })

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const WPhone = require('wphone').default

    const phone = new WPhone({
      displayName: 'ACCT Test',
      domain: 'test.sip.fonoster.io',
      username: 'testacct',
      secret: 'changeit',
      audioElementId: 'remoteAudio',
      server: 'wss://api.fonoster.io:5063',
    })

    if (!phone) return

    setPhoneInstance(phone)

    await phone.connect()
    await phone.call({
      targetAOR: 'sip:voice@default',
      extraHeaders: [`X-DID-Info: ${e164Number}`],
    })

    phone.inviter.stateChange.addListener((state: CallSessionState) => {
      if (state === CallSessionState.TERMINATED) {
        phone?.disconnect()

        setPhoneInstance(null)
      }
    })
  }, [])

  const onHangup = useCallback(() => {
    if (wphone?.isConnected()) {
      const isEstablishing = [
        CallSessionState.INITIAL,
        CallSessionState.ESTABLISHING,
      ].includes(wphone.inviter.state)

      if (isEstablishing)
        return Notifier.warning('Call not established, cannot hangup')

      wphone.inviter.state === CallSessionState.TERMINATED
        ? wphone.inviter.cancel()
        : wphone?.hangup()

      wphone?.disconnect()

      setPhoneInstance(null)
    }
  }, [wphone])

  const onOpen = useCallback((refId: string) => {
    setDeleteModalOpen(true)
    setDeleteRef(refId)
  }, [])

  const onDelete = useCallback(() => {
    mutate(deleteRef, {
      onSuccess() {
        setDeleteModalOpen(false)

        Notifier.success('Your Number has been successfully deleted.')
      },
    })
  }, [mutate, deleteRef])

  if (isSuccess && !numbers.length) return <NoNumbers />

  return isSuccess ? (
    <>
      <div className="mb-4 lg:w-4/6">
        <Title level={3}>Phone Numbers</Title>
        <Text className="whitespace-normal">
          You will need a Number to make and receive calls from traditional
          phones.{' '}
          <a
            className="term"
            href="https://learn.fonoster.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more.
          </a>
        </Text>
      </div>
      <table className="table-auto border-collapse rounded">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-6 text-left text-xs font-medium text-white tracking-wider"
            >
              REF
            </th>
            <th
              scope="col"
              className="px-6 py-6 text-left text-xs font-medium text-white tracking-wider"
            >
              TRUNK REF
            </th>
            <th
              scope="col"
              className="px-6 py-6 text-left text-xs font-medium text-white tracking-wider"
            >
              E164 NUMBER
            </th>
            <th
              scope="col"
              className="px-6 py-6 text-left text-xs font-medium text-white tracking-wider"
            >
              WEBHOOK
            </th>
            <th scope="col" className="relative px-6 py-6">
              <span className="sr-only">ACTIONS</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((num, idx) => (
            <tr
              key={num.ref}
              className={idx % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'}
            >
              <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                {num.ref}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                {num.providerRef}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                {num.e164Number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                {num.ingressInfo?.webhook}
              </td>
              <td className="flex items-center px-6 py-4 text-right font-medium justify-end">
                <Button
                  size="small"
                  className="mr-4"
                  icon={
                    !wphone ? (
                      <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <StatusOfflineIcon
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    )
                  }
                  onClick={() =>
                    wphone ? onHangup() : onTestCall(num.e164Number)
                  }
                  type={wphone ? 'outline' : 'primary'}
                  data-desc={`Number ID: ${num.ref}`}
                  data-intent={`Test call to ${num.e164Number}`}
                >
                  {wphone ? 'Hangup call' : 'Test Call'}
                </Button>
                <div className="flex justify-end">
                  <Menu as="div" className="relative flex-shrink-0">
                    <div>
                      <Menu.Button className="w-10 h-10 flex bg-gray-700 p-1 rounded-full items-center justify-center text-white focus:outline-none text-sm">
                        <DotsHorizontalIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classes(
                                active ? 'bg-gray-600' : '',
                                'w-full block px-4 py-2 text-sm text-gray-300 text-left'
                              )}
                              onClick={() => openEditing(num)}
                              data-desc={`Number ID: ${num.ref}`}
                              data-intent="Edit Number"
                            >
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classes(
                                active ? 'bg-gray-600' : '',
                                'w-full block px-4 py-2 text-sm text-gray-300 text-left'
                              )}
                              onClick={() => onOpen(num.ref)}
                              data-desc={`Number ID: ${num.ref}`}
                              data-intent="Delete Number"
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteResource
        refId={deleteRef}
        title={`Delete Number (${deleteRef})`}
        isOpen={isDeleteModalOpen}
        isLoading={isLoading}
        onDelete={onDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  ) : (
    <Spinner />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const queryClient = getQueryClient()

  /**
   * @todo Find a way to hydrate queries on server without using fetch or axios
   * await queryClient.prefetchQuery('projects', getProjects)
   */

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

NumbersBoard.isProtected = true

export default NumbersBoard