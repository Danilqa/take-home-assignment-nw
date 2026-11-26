import { PageLayout, Title } from 'design-system/components'
import { BookDashboard } from '@web-app/domains/book-of-business/components'

export function ClientsPage() {
  return (
    <PageLayout>
      <Title>Clients</Title>
      <BookDashboard />
    </PageLayout>
  )
}
