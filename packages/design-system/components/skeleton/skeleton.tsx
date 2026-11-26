import { cx } from '../../styled-system/css'
import * as styles from './skeleton.styles'

export interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden className={cx(styles.skeleton, className)} />
}
