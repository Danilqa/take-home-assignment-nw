import { CartesianGrid } from 'recharts'
import { token } from '../../styled-system/tokens'

export function StackedBarChartMarks() {
  return (
    <CartesianGrid
      vertical={false}
      stroke={token.var('colors.outline.dotted')}
      strokeDasharray="1 6"
    />
  )
}
