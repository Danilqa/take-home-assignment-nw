import { Legend, type DefaultLegendContentProps } from 'recharts'
import { HStack } from '../stack'
import * as styles from './stacked-bar-chart-legend.styles'

function LegendContent({ payload }: DefaultLegendContentProps) {
  return (
    <ul className={styles.list}>
      {payload?.map(({ value, color }) => (
        <HStack as="li" key={value} gap="4">
          <span className={styles.swatch} style={{ backgroundColor: color }} />
          {value}
        </HStack>
      ))}
    </ul>
  )
}

export function StackedBarChartLegend() {
  return <Legend content={LegendContent} />
}
