import { css, cva } from '../../styled-system/css'

const INDENT_PER_LEVEL = '28px'

export const cell = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    boxSizing: 'border-box',
    height: '100%',
    paddingRight: '24',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid {colors.outline.solid}',
    outline: 'none',
    _focusVisible: {
      outline: '2px solid {colors.content.primary}',
      outlineOffset: '-2px',
    },
  },
  variants: {
    align: {
      start: {
        paddingLeft: '16',
        '&[data-tree-column]': {
          paddingLeft: `calc({spacing.16} + (var(--table-row-level) - 1) * ${INDENT_PER_LEVEL})`,
        },
      },
      end: { justifyContent: 'flex-end' },
    },
  },
  defaultVariants: { align: 'start' },
})

// Opaque, so that the pinned header hides the rows scrolling beneath it.
export const column = css({
  backgroundColor: 'background.secondary',
  color: 'content.secondary',
})

export const toggleSlot = css({ flexShrink: 0, width: '16px', height: '16px' })

export const toggle = css({
  position: 'relative',
  padding: '0',
  border: 'none',
  background: 'none',
  color: 'inherit',
  cursor: 'pointer',
  // Extends the 16px chevron to a 32px pointer target.
  _before: { content: '""', position: 'absolute', inset: '-8px' },
  transitionProperty: 'transform',
  transitionDuration: 'fast',
  transitionTimingFunction: 'out',
  _motionReduce: { transitionDuration: '0s' },
  _groupExpanded: { transform: 'rotate(90deg)' },
})
