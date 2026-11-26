import { css } from '../../styled-system/css'

export const row = css({
  height: '100%',
  outline: 'none',
  _hover: { backgroundColor: 'surface.secondary' },
  _selected: { backgroundColor: 'surface.secondary' },
  _focusVisible: {
    outline: '2px solid {colors.content.primary}',
    outlineOffset: '-2px',
  },
  // React Aria marks a row as hovered only when a press on it does something.
  '&[data-hovered]': { cursor: 'pointer' },
})
