import React from 'react'

import { classes } from '../../helpers/classes'
import { useTitle } from '../../hooks/useTitle'
import { Header } from './Header'

const Content: React.FC = ({ children }) => {
  const { layout, showGaps } = useTitle()

  return layout === 'default' ? (
    <div className="h-full flex w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <section
              className={classes(
                'relative max-w-7xl mx-auto min-w-0 flex-1 h-full flex flex-col lg:order-last',
                showGaps ? 'p-6' : 'p-0'
              )}
            >
              {children}
            </section>
          </main>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full flex w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <section className="relative max-w-7xl mx-auto p-6 min-w-0 flex-1 h-full flex flex-col lg:order-last">
              {children}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Content {...{ children }} />
    </>
  )
}
