import { toBookNode } from 'domains/book-of-business/mappers'
import type { BookNode, BookOfBusinessDto } from 'domains/book-of-business/types'
import { api } from '@web-app/api'

export function getBookOfBusiness(): Promise<BookNode> {
  return api.get('book-of-business').json<BookOfBusinessDto>().then(toBookNode)
}
