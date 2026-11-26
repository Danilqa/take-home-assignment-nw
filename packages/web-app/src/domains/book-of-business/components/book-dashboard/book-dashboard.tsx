import {
  Card,
  ErrorBoundary,
  Skeleton,
  Table,
  VisuallyHidden,
} from 'design-system/components'
import { Suspense, useState } from 'react'
import {
  useBookOfBusiness,
  useResetBookOfBusiness,
} from '@web-app/domains/book-of-business/queries'
import { BookBreakdownTable } from '../book-breakdown-table'
import { BookTrendChart } from '../book-trend-chart'
import * as styles from './book-dashboard.styles'

function BookDashboardContent() {
  const { data: book } = useBookOfBusiness()
  const [drillDown, setDrillDown] = useState(() => Table.createDrillDown(book))
  const selected = Table.findSelected(book, drillDown)

  return (
    <>
      <Card className={styles.chartCard}>
        <BookTrendChart node={selected} />
      </Card>
      <Card className={styles.tableCard}>
        <BookBreakdownTable
          book={book}
          drillDown={drillDown}
          onDrillDownChange={setDrillDown}
        />
      </Card>
    </>
  )
}

function BookDashboardSkeleton() {
  return (
    <>
      <VisuallyHidden role="status">Loading clients</VisuallyHidden>
      <Skeleton className={styles.chartSkeleton} />
      <Skeleton className={styles.tableSkeleton} />
    </>
  )
}

export function BookDashboard() {
  const reset = useResetBookOfBusiness()

  return (
    <ErrorBoundary.Root
      onReset={() => void reset()}
      fallback={
        <ErrorBoundary.Fallback className={styles.error}>
          <ErrorBoundary.Title>Clients could not be loaded.</ErrorBoundary.Title>
          <ErrorBoundary.Description>
            Something went wrong on the way. Try again in a moment.
          </ErrorBoundary.Description>
          <ErrorBoundary.Retry>Try again</ErrorBoundary.Retry>
        </ErrorBoundary.Fallback>
      }
    >
      <Suspense fallback={<BookDashboardSkeleton />}>
        <BookDashboardContent />
      </Suspense>
    </ErrorBoundary.Root>
  )
}
