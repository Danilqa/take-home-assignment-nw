import { defineConfig } from '@pandacss/dev'
import { preset } from './tokens'

export default defineConfig({
  presets: [preset],
  jsxFramework: 'react',
  include: ['./**/*.{tsx,styles.ts}'],
})
