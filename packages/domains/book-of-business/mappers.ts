import { months } from './constants'
import type {
  BookLevel,
  BookNode,
  BranchDto,
  ChartData,
  CompanyDto,
  EmployeeDto,
  NodeDto,
} from './types'

export function toBookNode(company: CompanyDto): BookNode {
  return toNode(company, 'company', company.branches?.map(fromBranch))
}

function fromBranch(branch: BranchDto): BookNode {
  return toNode(branch, 'branch', branch.employees?.map(fromEmployee))
}

function fromEmployee(employee: EmployeeDto): BookNode {
  return toNode(employee, 'advisor', employee.channels?.map(fromChannel))
}

function fromChannel(channel: NodeDto): BookNode {
  return toNode(channel, 'acquisitionChannel')
}

function toNode(
  { id, name, values }: NodeDto,
  level: BookLevel,
  children?: BookNode[]
): BookNode {
  return children?.length
    ? { id, name, level, values, children }
    : { id, name, level, values }
}

export function toChartData(node: BookNode): ChartData {
  return {
    categories: months.map((month) => month.label),
    series: (node.children ?? [node]).map(({ id, name, values }) => ({
      id,
      name,
      values,
    })),
  }
}
