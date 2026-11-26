import { match } from 'ts-pattern'
import { bookOfBusiness } from './mock-db.ts'

export interface Reply {
  status: number
  body: unknown
}

export function route(method: string | undefined, pathname: string): Reply {
  return match([method, pathname])
    .with(['GET', '/api/book-of-business'], () => ({ status: 200, body: bookOfBusiness }))
    .otherwise(() => ({ status: 404, body: { error: 'Not found' } }))
}
