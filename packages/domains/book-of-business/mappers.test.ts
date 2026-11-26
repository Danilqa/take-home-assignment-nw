import { describe, expect, it } from 'vitest'
import { months } from './constants'
import { toBookNode, toChartData } from './mappers'
import type { BookNode, CompanyDto } from './types'

const company: CompanyDto = {
  id: 'company',
  name: 'Company',
  values: [10, 20],
  branches: [
    {
      id: 'branch-1',
      name: 'Branch 1',
      values: [7, 9],
      employees: [
        {
          id: 'anna',
          name: 'Anna Blackwood',
          values: [3, 4],
          channels: [{ id: 'paid', name: 'New paid', values: [1, 1] }],
        },
        { id: 'james', name: 'James Walker', values: [2, 2] },
      ],
    },
    { id: 'branch-2', name: 'Branch 2', values: [5, 6] },
  ],
}

describe('toBookNode', () => {
  it('maps each depth to its level and keeps values as served', () => {
    expect(toBookNode(company)).toEqual({
      id: 'company',
      name: 'Company',
      level: 'company',
      values: [10, 20],
      children: [
        {
          id: 'branch-1',
          name: 'Branch 1',
          level: 'branch',
          values: [7, 9],
          children: [
            {
              id: 'anna',
              name: 'Anna Blackwood',
              level: 'advisor',
              values: [3, 4],
              children: [
                {
                  id: 'paid',
                  name: 'New paid',
                  level: 'acquisitionChannel',
                  values: [1, 1],
                },
              ],
            },
            { id: 'james', name: 'James Walker', level: 'advisor', values: [2, 2] },
          ],
        },
        { id: 'branch-2', name: 'Branch 2', level: 'branch', values: [5, 6] },
      ],
    })
  })

  it('leaves children out of nodes without children', () => {
    const node = toBookNode({ id: 'company', name: 'Company', values: [], branches: [] })

    expect(node).not.toHaveProperty('children')
  })
})

const categories = months.map((month) => month.label)

describe('toChartData', () => {
  it('maps each direct child to one series', () => {
    const node: BookNode = {
      id: 'company',
      name: 'Company',
      level: 'company',
      values: [99],
      children: [
        {
          id: 'branch-1',
          name: 'Branch 1',
          level: 'branch',
          values: [1],
          children: [{ id: 'anna', name: 'Anna', level: 'advisor', values: [1] }],
        },
        { id: 'branch-2', name: 'Branch 2', level: 'branch', values: [2] },
      ],
    }

    expect(toChartData(node)).toEqual({
      categories,
      series: [
        { id: 'branch-1', name: 'Branch 1', values: [1] },
        { id: 'branch-2', name: 'Branch 2', values: [2] },
      ],
    })
  })

  it('maps a node without children to a series of its own values', () => {
    const node: BookNode = { id: 'james', name: 'James', level: 'advisor', values: [3] }

    expect(toChartData(node)).toEqual({
      categories,
      series: [{ id: 'james', name: 'James', values: [3] }],
    })
  })
})
