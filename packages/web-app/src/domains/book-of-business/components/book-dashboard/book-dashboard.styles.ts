import { css } from 'design-system/css'

export const chartCard = css({ padding: '16', paddingTop: '24' })

// The card grows with the table, so the page is the only vertical scroller.
export const tableCard = css({ overflow: 'hidden' })

export const chartSkeleton = css({ height: '430px' })

export const tableSkeleton = css({ height: '280px' })

// As tall as the chart skeleton, so the page does not jump when a load fails.
export const error = css({ minHeight: '430px' })
