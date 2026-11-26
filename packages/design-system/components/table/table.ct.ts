import { expect, test, type Locator } from '@playwright/test'

function rowsOf(table: Locator) {
  return {
    // The name of an expandable row starts with the label of its toggle: "Expand Parent".
    row: (name: string) => table.getByRole('row', { name: new RegExp(`${name}$`) }),
    expand: (name: string) =>
      table.getByRole('button', { name: `Expand ${name}`, exact: true }).click(),
    collapse: (name: string) =>
      table.getByRole('button', { name: `Collapse ${name}`, exact: true }).click(),
  }
}

test('expands and collapses a row with the mouse', async ({ mount }) => {
  const { row, expand, collapse } = rowsOf(await mount('table/Collapsed'))

  await expand('Parent')
  await expect(row('Child')).toBeVisible()

  await collapse('Parent')
  await expect(row('Child')).toBeHidden()
})

test('expands and collapses a row from the keyboard', async ({ mount, page }) => {
  const { row } = rowsOf(await mount('table/Collapsed'))

  await page.keyboard.press('Tab')
  await expect(row('Parent')).toBeFocused()

  await page.keyboard.press('ArrowRight')
  await expect(row('Child')).toBeVisible()

  await page.keyboard.press('ArrowDown')
  await expect(row('Child')).toBeFocused()

  await page.keyboard.press('ArrowUp')
  await page.keyboard.press('ArrowLeft')
  await expect(row('Child')).toBeHidden()
  await expect(row('Parent')).toBeFocused()
})

test('tells assistive technology the level of a row and whether it is expanded', async ({
  mount,
}) => {
  const { row, expand } = rowsOf(await mount('table/Collapsed'))

  await expect(row('Parent')).toHaveAttribute('aria-level', '1')
  await expect(row('Parent')).toHaveAttribute('aria-expanded', 'false')

  await expand('Parent')

  await expect(row('Parent')).toHaveAttribute('aria-expanded', 'true')
  await expect(row('Child')).toHaveAttribute('aria-level', '2')
  await expect(row('Child')).toHaveAttribute('aria-expanded', 'false')
})

test('gives a row without children no toggle and no expanded state', async ({
  mount,
}) => {
  const { row } = rowsOf(await mount('table/ParentExpanded'))

  await expect(row('Sibling')).toBeVisible()
  await expect(row('Sibling').getByRole('button')).toHaveCount(0)
  await expect(row('Sibling')).not.toHaveAttribute('aria-expanded')
})

test('nests rows three levels deep', async ({ mount }) => {
  const table = await mount('table/AllExpanded')
  const { row } = rowsOf(table)

  await expect(table.getByRole('treegrid', { name: 'Items' })).toBeVisible()
  await expect(row('Parent')).toHaveAttribute('aria-level', '1')
  await expect(row('Child')).toHaveAttribute('aria-level', '2')
  await expect(row('Grandchild')).toHaveAttribute('aria-level', '3')
})

test('keeps 10,001 rows to a few in the DOM while the page scrolls', async ({
  mount,
}) => {
  const table = await mount('table/ManyRows')
  const { row } = rowsOf(table)

  // The 10,001 rows and the header row.
  await expect(table.getByRole('treegrid')).toHaveAttribute('aria-rowcount', '10002')

  await row('Parent').press('End')

  await expect(row('Child 10000')).toBeFocused()
  await expect(row('Child 10000')).toBeInViewport()
  expect(await table.getByRole('row').count()).toBeLessThan(50)
})
