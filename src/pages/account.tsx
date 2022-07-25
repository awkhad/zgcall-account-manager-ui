import { useCallback } from 'react'

import { useLoggedIn } from '@/mods/auth/hooks/useLoggedIn'
import {
  ChangePlan,
  useChangePlanPanel,
} from '@/mods/billing/components/change-plan'
import { usePaymentMethods } from '@/mods/billing/hooks/usePaymentMethods'
import { classes } from '@/mods/shared/helpers/classes'
import { getPrice } from '@/mods/shared/helpers/price'
import { Button, Spinner, Text, Title } from '@/ui'

export function Account() {
  const { plan, user } = useLoggedIn()
  const { open } = useChangePlanPanel()
  const { paymentMethods, isLoading } = usePaymentMethods()

  const isStarter = useCallback(
    () => plan && plan.name.toLowerCase() === 'starter',
    [plan]
  )

  if (!plan || isLoading) return <Spinner />

  return (
    <>
      <div className="flex-1 relative flex overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none xl:order-first">
          <div className="absolute inset-0">
            <Title level={3}>Your current plan</Title>
            <Text>
              {isStarter()
                ? 'You are currently on the Starter plan. Configure your billing account for more projects and additional benefits.'
                : 'You are currently on the Pro plan. Please refer to the documentation for limits and additions to your subscription.'}
            </Text>

            <div className="plan relative rounded-lg border border-gray-500 bg-gray-700 p-6 shadow-sm">
              <div className="flex justify-between">
                <div className="plan-name">
                  <Title level={4} className="flex">
                    <span>
                      {plan.name}
                      {' — '}
                    </span>
                    <span
                      className={classes(
                        'ml-1',
                        user.status === 'active'
                          ? 'text-primary'
                          : 'text-cancel'
                      )}
                    >
                      {user.status}
                    </span>
                  </Title>
                </div>
                <div className="plan-price">
                  <Title level={4}>{getPrice(plan)}</Title>
                </div>
              </div>
              <div className="plan-description max-w-lg">
                <Text className="p-0 m-0">{plan.description}</Text>
              </div>
            </div>

            {paymentMethods.length === 0 ? (
              <Text className="mt-4">
                Add a payment method to enable plan upgrade.
              </Text>
            ) : (
              <Button
                className="mt-8 w-full"
                isFullWidth
                onClick={() => open()}
                disabled={paymentMethods.length === 0}
              >
                Change plan
              </Button>
            )}
          </div>
        </main>
      </div>
      <ChangePlan />
    </>
  )
}

export default Account
