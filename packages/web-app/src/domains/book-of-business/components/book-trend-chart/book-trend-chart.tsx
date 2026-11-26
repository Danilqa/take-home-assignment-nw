import { StackedBarChart } from 'design-system/components'
import { toChartData } from 'domains/book-of-business/mappers'
import type { BookNode } from 'domains/book-of-business/types'
import { match } from 'ts-pattern'

export interface BookTrendChartProps {
  node: BookNode
}

function toChartLabel(node: BookNode) {
  const breakdown = match(node.children?.[0]?.level)
    .with('branch', () => ', by branch')
    .with('advisor', () => ', by advisor')
    .with('acquisitionChannel', () => ', by acquisition channel')
    .with('company', undefined, () => '')
    .exhaustive()

  return `Clients per month in ${node.name}${breakdown}. The same figures are in the table below.`
}

export function BookTrendChart({ node }: BookTrendChartProps) {
  return (
    <StackedBarChart.Root aria-label={toChartLabel(node)} {...toChartData(node)}>
      <StackedBarChart.Marks />
      <StackedBarChart.XAxis />
      <StackedBarChart.YAxis />
      <StackedBarChart.Columns />
      <StackedBarChart.Legend />
    </StackedBarChart.Root>
  )
}
