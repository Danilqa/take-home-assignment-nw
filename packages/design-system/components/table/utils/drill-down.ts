import { findPath, type TreeNode } from './tree'

export interface DrillDown {
  expandedIds: ReadonlySet<string>
  selectedId: string
}

export function createDrillDown<Node extends TreeNode<Node>>(root: Node): DrillDown {
  return { expandedIds: new Set([root.id]), selectedId: root.id }
}

export function findSelected<Node extends TreeNode<Node>>(
  root: Node,
  drillDown: DrillDown
): Node {
  return findPath(root, drillDown.selectedId).at(-1) ?? root
}

export function changeExpanded<Node extends TreeNode<Node>>(
  root: Node,
  drillDown: DrillDown,
  expandedIds: ReadonlySet<string>
): DrillDown {
  let { selectedId } = drillDown

  for (const expandedId of expandedIds.difference(drillDown.expandedIds)) {
    selectedId = expandedId
  }

  for (const collapsedId of drillDown.expandedIds.difference(expandedIds)) {
    const selectedPath = findPath(root, selectedId)

    if (selectedPath.some((node) => node.id === collapsedId)) {
      selectedId = findPath(root, collapsedId).at(-2)?.id ?? root.id
    }
  }

  return { expandedIds, selectedId }
}

export function pressRow<Node extends TreeNode<Node>>(
  root: Node,
  drillDown: DrillDown,
  id: string
): DrillDown {
  const hasChildren = findPath(root, id).at(-1)?.children !== undefined

  return hasChildren
    ? changeExpanded(
        root,
        drillDown,
        drillDown.expandedIds.symmetricDifference(new Set([id]))
      )
    : { ...drillDown, selectedId: id }
}
