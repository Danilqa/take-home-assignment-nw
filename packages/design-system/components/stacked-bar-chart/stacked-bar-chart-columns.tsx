import { use, useState } from 'react'
import { Bar, BarStack } from 'recharts'
import { token } from '../../styled-system/tokens'
import { SeriesContext } from './stacked-bar-chart-context'

const colors = [
  token.var('colors.chart.purple'),
  token.var('colors.chart.peach'),
  token.var('colors.chart.maroon'),
  token.var('colors.chart.teal'),
  token.var('colors.chart.blue'),
] as const

export function StackedBarChartColumns() {
  const series = use(SeriesContext)
  // Recharts animates every change of a bar, so a resized chart slides its bars
  // sideways. Animating the entrance only keeps the motion bottom to top.
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <BarStack radius={4}>
      {series.map(({ id, name }, index) => (
        <Bar
          key={id}
          dataKey={id}
          name={name}
          fill={colors[index % colors.length] ?? colors[0]}
          isAnimationActive={hasEntered ? false : 'auto'}
          onAnimationEnd={() => {
            setHasEntered(true)
          }}
        />
      ))}
    </BarStack>
  )
}
