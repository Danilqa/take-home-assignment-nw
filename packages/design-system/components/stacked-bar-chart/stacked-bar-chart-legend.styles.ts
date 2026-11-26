import { css } from '../../styled-system/css'

export const list = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  columnGap: '16',
  paddingTop: '16',
  textStyle: 'footnote',
  color: 'content.secondary',
})

export const swatch = css({ width: '8px', height: '8px', borderRadius: '2' })
