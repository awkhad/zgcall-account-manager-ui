import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCallback, useMemo } from 'react'

import { useLoggedIn } from '@/mods/auth/hooks/useLoggedIn'
import { Notifier } from '@/mods/shared/components/Notification'
import { Panel } from '@/ui'

import { useAddPaymentMethod } from '../../hooks/useAddPaymentMethod'
import { useAddPaymentMethodPanel } from './useAddPaymentMethodPanel'

export const AddPaymentMethod = () => {
  const { user } = useLoggedIn()
  const stripe = useStripe()
  const elements = useElements()

  const { isOpen, close } = useAddPaymentMethodPanel()

  const { mutate, isLoading } = useAddPaymentMethod()

  const onClose = useCallback(() => {
    close()
  }, [close])

  const onSave = useCallback(
    (paymentMethodId: string) => {
      mutate(
        { paymentMethodId },
        {
          onSuccess() {
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
        loading: isLoading,
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
      </>
    </Panel>
  )
}
