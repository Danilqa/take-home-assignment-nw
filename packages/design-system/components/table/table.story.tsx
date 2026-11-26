import { Table } from '.'

interface Item {
  id: string
  name: string
  children?: Item[]
}

const family: Item[] = [
  {
    id: 'parent',
    name: 'Parent',
    children: [
      {
        id: 'child',
        name: 'Child',
        children: [{ id: 'grandchild', name: 'Grandchild' }],
      },
      { id: 'sibling', name: 'Sibling' },
    ],
  },
]

const crowd: Item[] = [
  {
    id: 'parent',
    name: 'Parent',
    children: Array.from({ length: 10_000 }, (_, index) => ({
      id: `child-${String(index + 1)}`,
      name: `Child ${String(index + 1)}`,
    })),
  },
]

interface ItemsTableProps {
  items: Item[]
  defaultExpandedKeys?: string[]
}

function ItemsTable({ items, ...props }: ItemsTableProps) {
  return (
    <Table.Root aria-label="Items" treeColumn="name" {...props}>
      <Table.Header>
        <Table.Column id="name" isRowHeader>
          Name
        </Table.Column>
        <Table.Column id="value">Value</Table.Column>
      </Table.Header>
      <Table.Body items={items}>
        {function renderItem(item: Item) {
          return (
            <Table.Row id={item.id}>
              <Table.Cell>
                <Table.ExpandToggle />
                {item.name}
              </Table.Cell>
              <Table.Cell>1</Table.Cell>
              {item.children && (
                <Table.Rows items={item.children}>{renderItem}</Table.Rows>
              )}
            </Table.Row>
          )
        }}
      </Table.Body>
    </Table.Root>
  )
}

export function Collapsed() {
  return <ItemsTable items={family} />
}

export function ParentExpanded() {
  return <ItemsTable items={family} defaultExpandedKeys={['parent']} />
}

export function AllExpanded() {
  return <ItemsTable items={family} defaultExpandedKeys={['parent', 'child']} />
}

export function ManyRows() {
  return <ItemsTable items={crowd} defaultExpandedKeys={['parent']} />
}
