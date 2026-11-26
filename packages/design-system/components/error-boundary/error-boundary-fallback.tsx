import type { ReactNode } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { cx } from '../../styled-system/css'
import { Button } from '../button'
import { Card } from '../card'
import { AlertIcon } from '../icon'
import { VStack } from '../stack'
import { Body } from '../typography'
import * as styles from './error-boundary-fallback.styles'

interface PartProps {
  children: ReactNode
}

export interface ErrorBoundaryFallbackProps extends PartProps {
  className?: string
}

export function ErrorBoundaryFallback({
  className,
  children,
}: ErrorBoundaryFallbackProps) {
  return (
    <Card role="alert" className={cx(styles.fallback, className)}>
      <VStack alignItems="center" gap="4" textAlign="center">
        <span className={styles.icon}>
          <AlertIcon />
        </span>
        {children}
      </VStack>
    </Card>
  )
}

export function ErrorBoundaryTitle({ children }: PartProps) {
  return <Body className={styles.title}>{children}</Body>
}

export function ErrorBoundaryDescription({ children }: PartProps) {
  return <Body className={styles.description}>{children}</Body>
}

export function ErrorBoundaryRetry({ children }: PartProps) {
  const { resetBoundary } = useErrorBoundary()

  return (
    <div className={styles.retry}>
      <Button onPress={resetBoundary}>{children}</Button>
    </div>
  )
}
