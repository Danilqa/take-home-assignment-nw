import { css } from '../../styled-system/css'

export const ROW_HEIGHT = 56

export const root = css({
  overflow: 'auto',
  maxHeight: '100%',
  scrollPaddingTop: ROW_HEIGHT,
  textStyle: 'body',
  color: 'content.primary',
})
