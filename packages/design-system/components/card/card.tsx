import type { ComponentProps } from 'react'
import { cx } from '../../styled-system/css'
import * as styles from './card.styles'

export function Card({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cx(styles.card, className)} {...rest} />
}
