import { test as base } from '@playwright/test'
import { createApi, type Api } from './fixtures/api'
import { createClientsPage, type ClientsPage } from './fixtures/clients-page'

interface Fixtures {
  api: Api
  clientsPage: ClientsPage
}

export const test = base.extend<Fixtures>({
  api: async ({ page }, provide) => {
    await provide(createApi(page))
  },
  clientsPage: async ({ page }, provide) => {
    await provide(createClientsPage(page))
  },
})

export { expect } from '@playwright/test'
