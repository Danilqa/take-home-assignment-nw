import { bookOfBusinessDto } from 'domains/book-of-business/mocks'
import { expect, test } from 'e2e/web-app'

test('user can see the clients as a chart and a table', async ({ clientsPage }) => {
  await clientsPage.open()

  await expect(clientsPage.title).toBeVisible()
  await expect(clientsPage.chart('Company, by branch')).toBeVisible()
  for (const name of ['Company', 'Branch 1', 'Branch 2', 'Branch 3']) {
    await expect(clientsPage.row(name)).toBeVisible()
  }
})

test('user can drill down from a branch to an advisor and an acquisition channel', async ({
  clientsPage,
}) => {
  await clientsPage.open()

  await clientsPage.expand('Branch 1')
  await expect(clientsPage.row('Anna Blackwood')).toBeVisible()

  await clientsPage.expand('Anna Blackwood')
  await expect(clientsPage.row('New organic')).toBeVisible()

  await clientsPage.collapse('Anna Blackwood')
  await expect(clientsPage.row('New organic')).toBeHidden()

  await clientsPage.collapse('Branch 1')
  await expect(clientsPage.row('Anna Blackwood')).toBeHidden()
})

test('user can see the chart follow the selected row', async ({ clientsPage }) => {
  await clientsPage.open()
  await expect(clientsPage.row('Company')).toHaveAttribute('aria-selected', 'true')

  await clientsPage.expand('Branch 1')
  await expect(clientsPage.chart('Branch 1, by advisor')).toBeVisible()
  await expect(clientsPage.row('Branch 1')).toHaveAttribute('aria-selected', 'true')

  await clientsPage.select('James Walker')
  await expect(clientsPage.chart('James Walker')).toBeVisible()

  await clientsPage.expand('Anna Blackwood')
  await expect(clientsPage.chart('Anna Blackwood, by acquisition channel')).toBeVisible()

  await clientsPage.select('New paid')
  await expect(clientsPage.chart('New paid')).toBeVisible()

  await clientsPage.collapse('Branch 1')
  await expect(clientsPage.chart('Company, by branch')).toBeVisible()
})

test('user can drill down with the keyboard', async ({ clientsPage }) => {
  await clientsPage.open()

  await clientsPage.expandFromKeyboard('Branch 1')
  await expect(clientsPage.row('Anna Blackwood')).toBeVisible()

  await clientsPage.collapseFromKeyboard('Branch 1')
  await expect(clientsPage.row('Anna Blackwood')).toBeHidden()
})

test('user can see that the clients are loading', async ({ clientsPage, api }) => {
  const respond = await api.hold('book-of-business', bookOfBusinessDto)
  await clientsPage.open()
  await expect(clientsPage.loading).toHaveText('Loading clients')

  respond()
  await expect(clientsPage.table).toBeVisible()
  await expect(clientsPage.loading).toBeHidden()
})

test('user can try again when the clients fail to load', async ({ clientsPage, api }) => {
  await api.fail('book-of-business')
  await clientsPage.open()
  await expect(clientsPage.error).toContainText('Clients could not be loaded.')

  await api.respond('book-of-business', bookOfBusinessDto)
  await clientsPage.tryAgain()
  await expect(clientsPage.table).toBeVisible()
  await expect(clientsPage.error).toBeHidden()
})
