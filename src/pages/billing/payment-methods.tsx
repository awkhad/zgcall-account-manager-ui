import {
  AddPaymentMethod,
  useAddPaymentMethodPanel,
} from '@/mods/billing/components/add-payment-method'
import { usePaymentMethods } from '@/mods/billing/hooks/usePaymentMethods'
import { classes } from '@/mods/shared/helpers/classes'
import { Button, Spinner, Title } from '@/ui'

export function PaymentMethods() {
  const { paymentMethods, isLoading } = usePaymentMethods()
  const { open } = useAddPaymentMethodPanel()

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
                    'cursor-pointer relative rounded-lg bg-gray-700 border border-gray-500 p-6 shadow-sm mb-6'
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="method-name">
                      <Title level={5} className="flex m-0 p-0">
                        <span>
                          {method.cardBrand} **** {method.cardLastFour}
                        </span>
                      </Title>
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
    </>
  )
}

export default PaymentMethods
