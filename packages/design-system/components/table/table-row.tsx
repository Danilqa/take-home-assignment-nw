import { Row, type RowProps } from 'react-aria-components/Table'
import { cx } from '../../styled-system/css'
import * as styles from './table-row.styles'

export type TableRowProps<T> = Omit<RowProps<T>, 'className' | 'style'>

export function TableRow<T>(props: TableRowProps<T>) {
  return <Row {...props} className={cx('group', styles.row)} />
}
