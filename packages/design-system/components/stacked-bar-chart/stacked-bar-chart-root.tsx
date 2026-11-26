import type { ReactNode } from 'react'
import { BarChart } from 'recharts'
import { SeriesContext, type ChartSeries } from './stacked-bar-chart-context'
import * as styles from './stacked-bar-chart-root.styles'

export interface StackedBarChartRootProps {
  'aria-label': string
  categories: readonly string[]
  series: readonly ChartSeries[]
  children: ReactNode
}

export function StackedBarChartRoot({
  'aria-label': label,
  categories,
  series,
  children,
}: StackedBarChartRootProps) {
  const data = categories.map((category, index) => ({
    category,
    ...Object.fromEntries(series.map(({ id, values }) => [id, values[index]])),
  }))

  return (
    <SeriesContext value={series}>
      <div role="img" aria-label={label}>
        {/* Recharts portals its layers into SVG groups. React listens for focus
            events on a portal's container, and browsers make an SVG group with
            such listeners a tab stop, so the drawing is taken out of the tab order. */}
        <div inert>
          <BarChart
            responsive
            data={data}
            accessibilityLayer={false}
            barCategoryGap="11%"
            margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
            className={styles.chart}
          >
            {children}
          </BarChart>
        </div>
      </div>
    </SeriesContext>
  )
}
