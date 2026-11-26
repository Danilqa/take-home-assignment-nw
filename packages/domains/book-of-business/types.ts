export interface NodeDto {
  id: string
  name: string
  values: number[]
}

export interface EmployeeDto extends NodeDto {
  channels?: NodeDto[]
}

export interface BranchDto extends NodeDto {
  employees?: EmployeeDto[]
}

export interface CompanyDto extends NodeDto {
  branches?: BranchDto[]
}

export type BookOfBusinessDto = CompanyDto

export type BookLevel = 'company' | 'branch' | 'advisor' | 'acquisitionChannel'

export type MonthlySeries = number[]

export interface BookNode {
  id: string
  name: string
  level: BookLevel
  values: MonthlySeries
  children?: BookNode[]
}

export interface Month {
  id: string
  label: string
}

export interface ChartSeries {
  id: string
  name: string
  values: number[]
}

export interface ChartData {
  categories: string[]
  series: ChartSeries[]
}
