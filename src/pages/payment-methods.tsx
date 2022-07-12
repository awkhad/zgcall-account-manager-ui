import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { Fragment, useCallback, useState } from 'react'

import {
  AddPaymentMethod,
  useAddPaymentMethodPanel,
} from '@/mods/billing/components/add-payment-method'
import { usePaymentMethods } from '@/mods/billing/hooks/usePaymentMethods'
import { useRemovePaymentMethod } from '@/mods/billing/hooks/useRemovePaymentMethod'
import { useSetDefaultPaymentMethod } from '@/mods/billing/hooks/useSetDefaultPaymentMethod'
import { DeleteResource } from '@/mods/shared/components/DeleteResource'
import { Notifier } from '@/mods/shared/components/Notification'
import { classes } from '@/mods/shared/helpers/classes'
import { getCardImage } from '@/mods/shared/helpers/getCardImage'
import { Button, Spinner, Text, Title } from '@/ui'

export function PaymentMethods() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const { paymentMethods, isLoading } = usePaymentMethods()
  const { open } = useAddPaymentMethodPanel()
  const [deleteRef, setDeleteRef] = useState('')

  const { mutate: mutateDelete, isLoading: isDeleteLoading } =
    useRemovePaymentMethod()
  const { mutate: mutateSetDefault, isLoading: isSettingLoading } =
    useSetDefaultPaymentMethod()

  const onOpen = useCallback((refId: string) => {
    setDeleteModalOpen(true)
    setDeleteRef(refId)
  }, [])

  const onDelete = useCallback(() => {
    mutateDelete(deleteRef, {
      onSuccess() {
        setDeleteModalOpen(false)
        Notifier.success('Your payment method has been deleted.')
      },
    })
  }, [mutateDelete, deleteRef])

  const onSetDefaultMethod = useCallback(
    (paymentId: string) => {
      const notification = Notifier.loading('Setting default payment method...')

      mutateSetDefault(paymentId, {
        onSuccess() {
          setDeleteModalOpen(false)

          Notifier.update(notification, {
            render: 'Your payment method has been set as default.',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
        },
      })
    },
    [mutateSetDefault]
  )

  if (isLoading) return <Spinner />

  return (
    <>
      <div className="flex-1 relative flex overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none xl:order-first">
          <div className="absolute inset-0">
            <Title level={3}>
              {paymentMethods.length
                ? 'Payment Methods'
                : "You don't have any payment method yet, add one."}
            </Title>
            <div className="mt-8">
              {paymentMethods.map(method => (
                <div
                  key={method.ref}
                  className={classes(
                    'relative rounded-lg bg-gray-700 border border-gray-500 p-6 shadow-sm mb-6'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-4 bg-gray-500 mr-4 rounded">
                        <img
                          src={getCardImage(method.cardBrand)}
                          alt={method.cardBrand}
                          className="w-10"
                        />
                      </div>
                      <div className="method-name">
                        <Title level={5} className="flex m-0 p-0">
                          <span>
                            {method.cardBrand} **** **** {method.cardLastFour}
                          </span>
                        </Title>
                        <Text className="m-0 p-0 text-sm">
                          Expires {method.cardExpMonth}/{method.cardExpYear}
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Menu as="div" className="relative flex-shrink-0">
                        <div>
                          <Menu.Button className="w-10 h-10 flex bg-gray-600 p-1 rounded-full items-center justify-center text-white focus:outline-none text-sm">
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
                                  onClick={() => onSetDefaultMethod(method.ref)}
                                >
                                  Set as default
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
                                  onClick={() => onOpen(method.ref)}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-2 w-full" isFullWidth onClick={() => open()}>
              Add payment method
            </Button>
          </div>
        </main>
      </div>
      <AddPaymentMethod />

      <DeleteResource
        title="Delete Card"
        isOpen={isDeleteModalOpen}
        isLoading={isLoading || isDeleteLoading || isSettingLoading}
        onDelete={onDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  )
}

export default PaymentMethods
