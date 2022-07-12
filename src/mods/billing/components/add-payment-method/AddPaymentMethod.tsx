import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCallback, useMemo, useState } from 'react'

import { useLoggedIn } from '@/mods/auth/hooks/useLoggedIn'
import { Notifier } from '@/mods/shared/components/Notification'
import { Panel, Text } from '@/ui'

import { useAddPaymentMethod } from '../../hooks/useAddPaymentMethod'
import { useAddPaymentMethodPanel } from './useAddPaymentMethodPanel'

export const AddPaymentMethod = () => {
  const { user } = useLoggedIn()
  const stripe = useStripe()
  const elements = useElements()

  const { isOpen, close } = useAddPaymentMethodPanel()

  const { mutate, isLoading: isLoadingPayment } = useAddPaymentMethod()

  const [isLoading, setIsLoading] = useState(false)

  const onClose = useCallback(() => {
    close()
  }, [close])

  const onSave = useCallback(
    (paymentMethodId: string) => {
      mutate(
        { paymentMethodId },
        {
          onSuccess() {
            setIsLoading(false)
            onClose()

            Notifier.success('Your payment method has been added.')
          },
        }
      )
    },
    [mutate, onClose]
  )

  const headings = useMemo(
    () => ({
      title: 'Add payment method',
      description:
        'If your needs change, you can switch plans once a month, as many times as you want-at no extra cost.',
      buttonText: 'Add payment method',
    }),
    []
  )

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)

    if (!stripe || !elements) {
      return ''
    }

    const card = elements.getElement(CardElement)

    if (!card) return

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      billing_details: {
        name: user.name,
        email: user.email,
      },
      card,
    })

    if (error) {
      Notifier.error(error.message)
      setIsLoading(false)
    }

    if (paymentMethod) {
      onSave(paymentMethod.id)
    }
  }, [stripe, elements, onSave, user.name, user.email])

  if (!stripe || !elements) {
    return null
  }

  return (
    <Panel
      close={onClose}
      isOpen={isOpen}
      title={headings.title}
      description={headings.description}
      saveButtonProps={{
        children: headings.buttonText,
        loading: isLoadingPayment || isLoading,
        disabled: !stripe || !elements,
        onClick: () => handleSubmit(),
      }}
    >
      <>
        <CardElement
          id="fonoster-card"
          options={{
            style: {
              base: {
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '16px',
                '::placeholder': {
                  color: '#bbbbbbbd',
                },
                padding: '66px',
              },
            },
          }}
        />
        <Text className="m-0 p-0 mt-2">
          It will be used as the default payment method.
        </Text>
      </>
    </Panel>
  )
}
