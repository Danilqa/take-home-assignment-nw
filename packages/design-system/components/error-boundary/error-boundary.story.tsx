import { useState } from 'react'
import { ErrorBoundary } from '.'

interface ContentProps {
  broken: boolean
}

function Content({ broken }: ContentProps) {
  if (broken) {
    throw new Error('Broken')
  }

  return <p>Content</p>
}

export function BrokenUntilRetry() {
  const [broken, setBroken] = useState(true)

  return (
    <ErrorBoundary.Root
      onReset={() => {
        setBroken(false)
      }}
      fallback={
        <ErrorBoundary.Fallback>
          <ErrorBoundary.Title>Content could not be shown.</ErrorBoundary.Title>
          <ErrorBoundary.Description>Try again in a moment.</ErrorBoundary.Description>
          <ErrorBoundary.Retry>Try again</ErrorBoundary.Retry>
        </ErrorBoundary.Fallback>
      }
    >
      <Content broken={broken} />
    </ErrorBoundary.Root>
  )
}
