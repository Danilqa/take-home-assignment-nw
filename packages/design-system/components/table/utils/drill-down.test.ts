import { describe, expect, it } from 'vitest'
import {
  changeExpanded,
  createDrillDown,
  findSelected,
  pressRow,
  type DrillDown,
} from './drill-down'
import type { TreeNode } from './tree'

type Row = TreeNode<Row>

const parentId = 'parent'
const childId = 'child'
const leafId = 'leaf'

const root: Row = {
  id: 'root',
  children: [
    {
      id: parentId,
      children: [{ id: childId, children: [{ id: 'grandchild' }] }, { id: leafId }],
    },
  ],
}

const childExpanded: DrillDown = {
  expandedIds: new Set([root.id, parentId, childId]),
  selectedId: childId,
}

describe('createDrillDown', () => {
  it('starts with the root expanded and selected', () => {
    expect(createDrillDown(root)).toEqual({
      expandedIds: new Set([root.id]),
      selectedId: root.id,
    })
  })
})

describe('findSelected', () => {
  it('is the selected node', () => {
    expect(findSelected(root, childExpanded).id).toBe(childId)
  })

  it('is the root when the selected id is not in the tree', () => {
    expect(findSelected(root, { ...childExpanded, selectedId: 'missing' })).toBe(root)
  })
})

describe('changeExpanded', () => {
  it('selects the row that expanded', () => {
    const expandedIds = new Set([root.id, parentId])

    expect(changeExpanded(root, createDrillDown(root), expandedIds)).toEqual({
      expandedIds,
      selectedId: parentId,
    })
  })

  it('selects the parent when the selected row collapses', () => {
    const expandedIds = new Set([root.id, parentId])

    expect(changeExpanded(root, childExpanded, expandedIds).selectedId).toBe(parentId)
  })

  it('selects the parent of a collapsed row above the selected one', () => {
    const expandedIds = new Set([root.id, childId])

    expect(changeExpanded(root, childExpanded, expandedIds).selectedId).toBe(root.id)
  })

  it('keeps the root selected when the root collapses', () => {
    const expandedIds = new Set([parentId, childId])

    expect(changeExpanded(root, childExpanded, expandedIds).selectedId).toBe(root.id)
  })

  it('keeps the selection when a row off the selected path collapses', () => {
    const rootSelected = { ...childExpanded, selectedId: root.id }
    const expandedIds = new Set([root.id, childId])

    expect(changeExpanded(root, rootSelected, expandedIds).selectedId).toBe(root.id)
  })
})

describe('pressRow', () => {
  it('expands a collapsed row with children and selects it', () => {
    expect(pressRow(root, createDrillDown(root), parentId)).toEqual({
      expandedIds: new Set([root.id, parentId]),
      selectedId: parentId,
    })
  })

  it('collapses an expanded row with children and selects its parent', () => {
    expect(pressRow(root, childExpanded, childId)).toEqual({
      expandedIds: new Set([root.id, parentId]),
      selectedId: parentId,
    })
  })

  it('selects a row without children', () => {
    expect(pressRow(root, childExpanded, leafId)).toEqual({
      expandedIds: childExpanded.expandedIds,
      selectedId: leafId,
    })
  })
})
