import { Avatar, Table, VisuallyHidden } from 'design-system/components'
import { months } from 'domains/book-of-business/constants'
import type { BookNode } from 'domains/book-of-business/types'
import { match } from 'ts-pattern'

export interface BookBreakdownTableProps {
  book: BookNode
  drillDown: Table.DrillDown
  onDrillDownChange: (drillDown: Table.DrillDown) => void
}

export function BookBreakdownTable({
  book,
  drillDown,
  onDrillDownChange,
}: BookBreakdownTableProps) {
  function renderRow(node: BookNode) {
    return (
      <Table.Row id={node.id}>
        <Table.Cell>
          <Table.ExpandToggle />
          {match(node.level)
            .with('advisor', () => <Avatar name={node.name} />)
            .with('company', 'branch', 'acquisitionChannel', () => null)
            .exhaustive()}
          {node.name}
        </Table.Cell>
        {months.map((month, index) => (
          <Table.Cell key={month.id} align="end">
            {node.values[index]}
          </Table.Cell>
        ))}
        {node.children && <Table.Rows items={node.children}>{renderRow}</Table.Rows>}
      </Table.Row>
    )
  }

  return (
    <Table.Root
      aria-label="Clients per month"
      treeColumn="name"
      expandedKeys={drillDown.expandedIds}
      onExpandedChange={(keys) => {
        const expandedIds = new Set(Array.from(keys, String))
        onDrillDownChange(Table.changeExpanded(book, drillDown, expandedIds))
      }}
      selectionMode="single"
      escapeKeyBehavior="none"
      selectedKeys={[drillDown.selectedId]}
      onSelectionChange={(keys) => {
        const [pressedId = drillDown.selectedId] = keys === 'all' ? [] : keys
        onDrillDownChange(Table.pressRow(book, drillDown, String(pressedId)))
      }}
    >
      <Table.Header>
        <Table.Column id="name" width={304} isRowHeader>
          <VisuallyHidden>Name</VisuallyHidden>
        </Table.Column>
        {months.map((month) => (
          <Table.Column key={month.id} id={month.id} align="end" minWidth={92}>
            {month.label}
          </Table.Column>
        ))}
      </Table.Header>
      <Table.Body items={[book]}>{renderRow}</Table.Body>
    </Table.Root>
  )
}
