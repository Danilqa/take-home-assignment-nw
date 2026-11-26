import '@fontsource-variable/inter/opsz.css'
import '../../src/index.css'
import { StrictMode, type ComponentType } from 'react'
import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'

type Props = Record<string, unknown>
type StoryModule = Record<string, ComponentType<Props>>

interface MountParams {
  story: string
  props?: Props
}

declare global {
  interface Window {
    mount: (params: MountParams) => Promise<void>
    unmount: () => Promise<void>
  }
}

const storyModules = import.meta.glob<StoryModule>([
  '../../src/**/*.story.tsx',
  '../../../design-system/**/*.story.tsx',
])

// A story id is the file name and the export: `table/Collapsed` is the
// `Collapsed` export of `table.story.tsx`.
async function findStory(id: string) {
  const [fileName = '', exportName = ''] = id.split('/')
  const load = Object.entries(storyModules).find(([path]) =>
    path.endsWith(`/${fileName}.story.tsx`)
  )?.[1]
  const storyModule = await load?.()

  return storyModule?.[exportName]
}

const rootElement = document.querySelector('#root')

if (rootElement === null) {
  throw new Error('Root element is missing')
}

let root: Root | undefined

window.mount = async ({ story, props }) => {
  const Story = await findStory(story)

  if (Story === undefined) {
    throw new Error(`Unknown story: ${story}`)
  }

  root ??= createRoot(rootElement)
  // flushSync makes an error in render reject the promise.
  flushSync(() => {
    root?.render(
      <StrictMode>
        <Story {...props} />
      </StrictMode>
    )
  })
}

window.unmount = () => {
  root?.unmount()
  root = undefined

  return Promise.resolve()
}
