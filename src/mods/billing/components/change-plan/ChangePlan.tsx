import { useCallback, useMemo, useState } from 'react'

import { useLoggedIn } from '@/mods/auth/hooks/useLoggedIn'
import { Notifier } from '@/mods/shared/components/Notification'
import { classes } from '@/mods/shared/helpers/classes'
import { getPrice } from '@/mods/shared/helpers/price'
import { Panel, Spinner, Text, Title } from '@/ui'

import { useChangePlan } from '../../hooks/useChangePlan'
import { usePlans } from '../../hooks/usePlans'
import { useChangePlanPanel } from './useChangePlanPanel'

export const ChangePlan = () => {
  const { isOpen, close } = useChangePlanPanel()

  const { mutate, isLoading } = useChangePlan()
  const { plans, isSuccess } = usePlans()

  const [currentPlan, setPlan] = useState('')
  const { plan } = useLoggedIn()

  const onClose = useCallback(() => {
    close()
    setPlan('')
  }, [close])

  const onSave = useCallback(
    (planRef: string) => {
      mutate(
        { planRef },
        {
          onSuccess() {
            onClose()

            Notifier.success('Your plan has been successfully changed.')
          },
        }
      )
    },
    [mutate, onClose]
  )

  const headings = useMemo(
    () => ({
      title: 'Choose the right plan for you',
      description:
        'If your needs change, you can switch plans once a month, as many times as you want-at no extra cost.',
      buttonText: 'Change',
    }),
    []
  )

  return (
    <Panel
      close={onClose}
      isOpen={isOpen}
      title={headings.title}
      description={headings.description}
      saveButtonProps={{
        children: headings.buttonText,
        loading: isLoading,
        disabled: currentPlan === plan?.ref,
        onClick: () => onSave(currentPlan),
      }}
    >
      <>
        {isSuccess ? (
          <>
            <div>
              {plans.map(p => (
                <div
                  key={p.name}
                  onClick={() => setPlan(p.ref)}
                  className={classes(
                    'cursor-pointer plan relative rounded-lg border p-6 shadow-sm mb-6',
                    currentPlan === p.ref ? 'border-primary' : 'border-gray-500'
                  )}
                >
                  <div className="flex justify-between">
                    <div className="plan-name">
                      <Title level={4} className={classes('flex')}>
                        <span>{p.name}</span>

                        {p.ref === plan?.ref && (
                          <>
                            {' — '}
                            <span className={classes('ml-1', 'text-primary')}>
                              current plan
                            </span>
                          </>
                        )}
                      </Title>
                    </div>
                    <div className="plan-price">
                      <Title level={4}>{getPrice(p)}</Title>
                    </div>
                  </div>
                  <div className="plan-description max-w-lg">
                    <Text className="p-0 m-0">{p.description}</Text>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </>
    </Panel>
  )
}
