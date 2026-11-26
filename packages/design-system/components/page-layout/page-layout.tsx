import type { ReactNode } from 'react'
import { VStack } from '../stack'

// The width of the frame in the design.
const MAX_WIDTH = '1440px'

export interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <VStack
      as="main"
      alignItems="stretch"
      gap="16"
      maxWidth={MAX_WIDTH}
      marginInline="auto"
      padding="16"
      paddingTop="24"
    >
      {children}
    </VStack>
  )
}
