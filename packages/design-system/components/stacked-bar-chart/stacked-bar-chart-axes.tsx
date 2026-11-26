import { XAxis, YAxis } from 'recharts'
import { token } from '../../styled-system/tokens'
import * as styles from './stacked-bar-chart-axes.styles'

const tick = {
  className: styles.tick,
  fill: token.var('colors.content.secondary'),
}

export function StackedBarChartXAxis() {
  return (
    <XAxis
      dataKey="category"
      height={28}
      interval="equidistantPreserveStart"
      tick={tick}
      tickLine={false}
      axisLine={false}
      tickSize={0}
      tickMargin={12}
    />
  )
}

export function StackedBarChartYAxis() {
  return (
    <YAxis
      width={38}
      niceTicks="snap125"
      tick={tick}
      tickLine={false}
      axisLine={false}
      tickSize={0}
      tickMargin={12}
    />
  )
}
