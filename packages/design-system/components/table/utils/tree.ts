export interface TreeNode<Node> {
  id: string
  children?: readonly Node[]
}

export function findPath<Node extends TreeNode<Node>>(node: Node, id: string): Node[] {
  if (node.id === id) {
    return [node]
  }

  for (const child of node.children ?? []) {
    const path = findPath(child, id)

    if (path.length > 0) {
      return [node, ...path]
    }
  }

  return []
}
