import { css } from '../../styled-system/css'

export const fallback = css({ display: 'grid', placeItems: 'center', padding: '24' })

export const icon = css({
  display: 'grid',
  placeItems: 'center',
  width: '48px',
  height: '48px',
  marginBottom: '12',
  borderRadius: 'full',
  backgroundColor: 'surface.secondary',
})

export const title = css({ fontWeight: '600' })

export const description = css({ color: 'content.secondary' })

export const retry = css({ marginTop: '12' })
