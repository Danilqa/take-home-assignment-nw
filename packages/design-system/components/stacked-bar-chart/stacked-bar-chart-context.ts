import { createContext } from 'react'

export interface ChartSeries {
  id: string
  name: string
  values: readonly number[]
}

export const SeriesContext = createContext<readonly ChartSeries[]>([])
