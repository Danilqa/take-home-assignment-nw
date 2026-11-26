import { createContext, use, type ReactNode } from 'react'
import {
  Button,
  Cell,
  Column,
  type CellProps,
  type CellRenderProps,
  type ColumnProps,
} from 'react-aria-components/Table'
import { cx } from '../../styled-system/css'
import { ChevronRightIcon } from '../icon'
import * as styles from './table-cell.styles'

const CellContext = createContext<Pick<CellRenderProps, 'id' | 'hasChildItems'>>({
  hasChildItems: false,
})

interface AlignProps {
  align?: 'start' | 'end'
}

export interface TableColumnProps
  extends Omit<ColumnProps, 'className' | 'style'>, AlignProps {}

export function TableColumn({ align, ...props }: TableColumnProps) {
  return <Column {...props} className={cx(styles.cell({ align }), styles.column)} />
}

export interface TableCellProps
  extends Omit<CellProps, 'className' | 'style' | 'children'>, AlignProps {
  children?: ReactNode
}

export function TableCell({ align, children, ...props }: TableCellProps) {
  return (
    <Cell {...props} className={styles.cell({ align })}>
      {(cell) => <CellContext value={cell}>{children}</CellContext>}
    </Cell>
  )
}

export function TableExpandToggle() {
  const { id, hasChildItems } = use(CellContext)

  if (!hasChildItems) {
    return <span className={styles.toggleSlot} />
  }

  // The virtualiser reuses the elements of one row for another. The key stops
  // the chevron from rotating when only the row behind it changed.
  return (
    <Button key={id} slot="chevron" className={cx(styles.toggleSlot, styles.toggle)}>
      <ChevronRightIcon />
    </Button>
  )
}
