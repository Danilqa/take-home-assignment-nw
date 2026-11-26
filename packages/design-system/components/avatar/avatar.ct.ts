import { expect, test } from '@playwright/test'
import type { Default } from './avatar.story'

const people = [
  { name: 'Anna Blackwood', initials: 'AB' },
  { name: 'maria de la Cruz', initials: 'MC' },
  { name: 'Cher', initials: 'C' },
]

for (const { name, initials } of people) {
  test(`shows ${initials} for ${name}`, async ({ mount }) => {
    const avatar = await mount<typeof Default>('avatar/Default', { name })

    await expect(avatar).toHaveText(initials)
  })
}

test('is hidden from assistive technology', async ({ mount }) => {
  const avatar = await mount<typeof Default>('avatar/Default', { name: 'Anna Blackwood' })

  await expect(avatar.getByText('AB')).toHaveAttribute('aria-hidden', 'true')
})
