import { expect, test } from '@playwright/test'

test('shows the fallback when its content fails to render', async ({ mount }) => {
  const boundary = await mount('error-boundary/BrokenUntilRetry')

  await expect(boundary.getByRole('alert')).toContainText('Content could not be shown.')
  await expect(boundary.getByRole('alert')).toContainText('Try again in a moment.')
})

test('renders its content again on retry', async ({ mount }) => {
  const boundary = await mount('error-boundary/BrokenUntilRetry')

  await boundary.getByRole('button', { name: 'Try again' }).click()

  await expect(boundary.getByText('Content', { exact: true })).toBeVisible()
  await expect(boundary.getByRole('alert')).toBeHidden()
})
