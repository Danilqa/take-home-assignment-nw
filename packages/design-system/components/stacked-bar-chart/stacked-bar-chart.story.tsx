import { StackedBarChart } from '.'

const categories = ['Feb 2024', 'Mar 2024']
const series = [
  { id: 'existing', name: 'Existing clients', values: [25, 26] },
  { id: 'organic', name: 'New organic', values: [1, 2] },
  { id: 'paid', name: 'New paid', values: [3, 1] },
]

export function Default() {
  return (
    <StackedBarChart.Root
      aria-label="Clients per month"
      categories={categories}
      series={series}
    >
      <StackedBarChart.Marks />
      <StackedBarChart.XAxis />
      <StackedBarChart.YAxis />
      <StackedBarChart.Columns />
      <StackedBarChart.Legend />
    </StackedBarChart.Root>
  )
}
