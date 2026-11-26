import type { Month } from './types'

const labelFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export const months: Month[] = Array.from({ length: 12 }, (_, index) => {
  const date = new Date(Date.UTC(2024, 1 + index))
  return { id: date.toISOString().slice(0, 7), label: labelFormat.format(date) }
})
