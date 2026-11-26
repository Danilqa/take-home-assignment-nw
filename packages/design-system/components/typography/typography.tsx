import type { ComponentProps } from 'react'
import { cx } from '../../styled-system/css'
import * as styles from './typography.styles'

export function Title({ className, children, ...rest }: ComponentProps<'h1'>) {
  return (
    <h1 className={cx(styles.title, className)} {...rest}>
      {children}
    </h1>
  )
}

export function Body({ className, ...rest }: ComponentProps<'span'>) {
  return <span className={cx(styles.body, className)} {...rest} />
}
