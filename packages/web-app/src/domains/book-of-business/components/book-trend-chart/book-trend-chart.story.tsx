import { toBookNode } from 'domains/book-of-business/mappers'
import { bookOfBusinessDto } from 'domains/book-of-business/mocks'
import { BookTrendChart } from '.'

const book = toBookNode(bookOfBusinessDto)
const advisor = book.children?.[0]?.children?.[0] ?? book

export function Default() {
  return <BookTrendChart node={book} />
}

export function AcquisitionChannels() {
  return <BookTrendChart node={advisor} />
}
