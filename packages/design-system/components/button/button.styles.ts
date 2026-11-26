import { css } from '../../styled-system/css'

export const button = css({
  paddingInline: '16',
  paddingBlock: '8',
  border: '1px solid {colors.outline.solid}',
  borderRadius: '8',
  backgroundColor: 'background.secondary',
  color: 'content.primary',
  textStyle: 'body',
  cursor: 'pointer',
  outline: 'none',
  _hover: { backgroundColor: 'surface.secondary' },
  _focusVisible: {
    outline: '2px solid {colors.content.primary}',
    outlineOffset: '2px',
  },
})
