import { css } from '../../styled-system/css'

export const skeleton = css({
  backgroundColor: 'surface.secondary',
  borderRadius: '4',
  animationName: 'pulse',
  animationDuration: 'slow',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
  _motionReduce: { animationName: 'none' },
})
