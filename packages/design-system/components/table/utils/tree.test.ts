import { describe, expect, it } from 'vitest'
import { findPath, type TreeNode } from './tree'

interface Row extends TreeNode<Row> {
  name: string
}

const leaf: Row = { id: 'leaf', name: 'Leaf' }
const parent: Row = { id: 'parent', name: 'Parent', children: [leaf] }
const root: Row = {
  id: 'root',
  name: 'Root',
  children: [{ id: 'sibling', name: 'Sibling' }, parent],
}

describe('findPath', () => {
  it('runs from the root down to the node', () => {
    expect(findPath(root, 'leaf')).toEqual([root, parent, leaf])
  })

  it('is the root alone for the root', () => {
    expect(findPath(root, 'root')).toEqual([root])
  })

  it('is empty for an id that is not in the tree', () => {
    expect(findPath(root, 'missing')).toEqual([])
  })
})
