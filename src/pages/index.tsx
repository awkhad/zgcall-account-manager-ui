import { ChangePlan } from '@/mods/billing/components/change-plan'
import { useInvoices } from '@/mods/billing/hooks/useInvoices'
import { classes } from '@/mods/shared/helpers/classes'
import { getBillPrice } from '@/mods/shared/helpers/price'
import { Spinner, Title } from '@/ui'

export function Billing() {
  const { invoices, isLoading } = useInvoices()

  if (isLoading) return <Spinner />

  return (
    <>
      <div className="flex-1 relative flex overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none xl:order-first">
          <div className="absolute inset-0">
            <Title level={3}>
              {invoices.length
                ? 'Latest bills'
                : "You don't have paid bills yet, come back on the next billing date."}
            </Title>
            <div className="mt-8">
              {invoices.map(invoice => (
                <div
                  key={invoice.ref}
                  className={classes(
                    'cursor-pointer relative rounded-lg bg-gray-700 border border-gray-500 p-6 shadow-sm mb-6'
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="bill-name">
                      <Title level={5} className="flex m-0 p-0">
                        <span>
                          {new Date(invoice.createdAt).toDateString()}
                        </span>
                      </Title>
                    </div>
                    <div className="bill-price">
                      <Title level={4} className="m-0 p-0">
                        {getBillPrice(invoice.paidAmount, invoice.currency)}
                      </Title>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <ChangePlan />
    </>
  )
}

export default Billing
