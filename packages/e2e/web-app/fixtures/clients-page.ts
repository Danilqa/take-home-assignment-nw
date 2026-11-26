import type { Locator, Page } from '@playwright/test'

export interface ClientsPage {
  title: Locator
  chart: (name: string) => Locator
  table: Locator
  loading: Locator
  error: Locator
  row: (name: string) => Locator
  open: () => Promise<void>
  expand: (name: string) => Promise<void>
  collapse: (name: string) => Promise<void>
  select: (name: string) => Promise<void>
  expandFromKeyboard: (name: string) => Promise<void>
  collapseFromKeyboard: (name: string) => Promise<void>
  tryAgain: () => Promise<void>
}

export function createClientsPage(page: Page): ClientsPage {
  const table = page.getByRole('treegrid', { name: 'Clients per month' })
  const row = (name: string) => table.getByRole('row', { name })

  return {
    title: page.getByRole('heading', { name: 'Clients' }),
    chart: (name) =>
      page.getByRole('img', {
        name: `Clients per month in ${name}. The same figures are in the table below.`,
      }),
    table,
    loading: page.getByRole('status'),
    error: page.getByRole('alert'),
    row,
    open: async () => {
      await page.goto('/')
    },
    // A click anywhere on a row with children expands or collapses it.
    expand: async (name) => {
      await row(name).click()
    },
    collapse: async (name) => {
      await row(name).click()
    },
    select: async (name) => {
      await row(name).click()
    },
    expandFromKeyboard: async (name) => {
      await row(name).press('ArrowRight')
    },
    collapseFromKeyboard: async (name) => {
      await row(name).press('ArrowLeft')
    },
    tryAgain: async () => {
      await page.getByRole('button', { name: 'Try again' }).click()
    },
  }
}
