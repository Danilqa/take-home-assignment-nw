import { defineConfig } from '@pandacss/dev'
import { preset } from 'design-system/tokens'

export default defineConfig({
  presets: [preset],
  preflight: true,
  jsxFramework: 'react',
  include: ['./src/**/*.{tsx,styles.ts}', '../design-system/**/*.{tsx,styles.ts}'],
  // The web app imports `css` from `design-system/css`; the design system
  // imports it from its own generated `styled-system` folder.
  importMap: ['design-system', 'styled-system'],
})
