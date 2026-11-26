import '@fontsource-variable/inter/opsz.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClientsPage } from '@web-app/pages/clients'

const root = document.querySelector('#root')

if (root === null) {
  throw new Error('Root element is missing')
}

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ClientsPage />
    </QueryClientProvider>
  </StrictMode>
)
