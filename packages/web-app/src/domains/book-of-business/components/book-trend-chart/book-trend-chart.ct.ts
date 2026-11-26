import { expect, test } from '@playwright/test'
import { months } from 'domains/book-of-business/constants'
import { bookOfBusinessDto } from 'domains/book-of-business/mocks'

const branches = bookOfBusinessDto.branches ?? []
const channels = branches[0]?.employees?.[0]?.channels ?? []

test('labels the chart and points to the table', async ({ mount }) => {
  const chart = await mount('book-trend-chart/Default')

  await expect(
    chart.getByRole('img', {
      name: 'Clients per month in Company, by branch. The same figures are in the table below.',
    })
  ).toBeVisible()
})

test('stacks one segment per branch in every month', async ({ mount }) => {
  const chart = await mount('book-trend-chart/Default')

  await expect(chart.locator('.recharts-bar-rectangle')).toHaveCount(
    branches.length * months.length
  )
})

test('lists the branches in the legend, in order', async ({ mount }) => {
  const chart = await mount('book-trend-chart/Default')

  await expect(chart.getByRole('listitem')).toHaveText(
    branches.map((branch) => branch.name)
  )
})

test('breaks an advisor down by acquisition channel', async ({ mount }) => {
  const chart = await mount('book-trend-chart/AcquisitionChannels')

  await expect(
    chart.getByRole('img', {
      name: 'Clients per month in Anna Blackwood, by acquisition channel. The same figures are in the table below.',
    })
  ).toBeVisible()
  await expect(chart.getByRole('listitem')).toHaveText(
    channels.map((channel) => channel.name)
  )
})
