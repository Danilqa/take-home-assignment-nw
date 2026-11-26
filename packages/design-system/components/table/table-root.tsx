import { Table, type TableProps } from 'react-aria-components/Table'
import { TableLayout, Virtualizer } from 'react-aria-components/Virtualizer'
import * as styles from './table-root.styles'

const layoutOptions = { rowHeight: styles.ROW_HEIGHT }

export type TableRootProps = Omit<TableProps, 'className' | 'style'>

export function TableRoot(props: TableRootProps) {
  return (
    <Virtualizer layout={TableLayout} layoutOptions={layoutOptions}>
      <Table {...props} className={styles.root} />
    </Virtualizer>
  )
}
