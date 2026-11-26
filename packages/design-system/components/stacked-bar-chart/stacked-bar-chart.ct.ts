import { expect, test } from '@playwright/test'

test('exposes the chart as a labelled image', async ({ mount }) => {
  const chart = await mount('stacked-bar-chart/Default')

  await expect(chart.getByRole('img', { name: 'Clients per month' })).toBeVisible()
})

test('stacks one segment per series in every category', async ({ mount }) => {
  const chart = await mount('stacked-bar-chart/Default')

  // The story has three series in two categories.
  await expect(chart.locator('.recharts-bar-rectangle')).toHaveCount(6)
})

test('lists the series names in the legend, in order', async ({ mount }) => {
  const chart = await mount('stacked-bar-chart/Default')

  await expect(chart.getByRole('list').getByRole('listitem')).toHaveText([
    'Existing clients',
    'New organic',
    'New paid',
  ])
})
