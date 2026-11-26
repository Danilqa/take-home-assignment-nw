import type { Page } from '@playwright/test'

export interface Api {
  respond: (path: string, body: unknown) => Promise<void>
  fail: (path: string) => Promise<void>
  hold: (path: string, body: unknown) => Promise<() => void>
}

export function createApi(page: Page): Api {
  const url = (path: string) => `**/api/${path}`

  return {
    respond: async (path, body) => {
      await page.route(url(path), (route) => route.fulfill({ json: body }))
    },
    fail: async (path) => {
      await page.route(url(path), (route) => route.fulfill({ status: 500 }))
    },
    hold: async (path, body) => {
      const held = Promise.withResolvers<undefined>()
      await page.route(url(path), async (route) => {
        await held.promise
        await route.fulfill({ json: body })
      })
      return () => {
        held.resolve(undefined)
      }
    },
  }
}
