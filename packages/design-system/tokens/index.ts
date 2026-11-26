import { definePreset } from '@pandacss/dev'
import presetBase from '@pandacss/preset-base'

export const preset = definePreset({
  name: 'design-system',
  presets: [presetBase],
  theme: {
    tokens: {
      colors: {
        content: {
          primary: { value: '#141413' },
          secondary: { value: '#14141399' },
        },
        background: {
          primary: { value: '#f7f5ed' },
          secondary: { value: '#ffffff' },
        },
        surface: {
          secondary: { value: '#1414130a' },
        },
        outline: {
          solid: { value: '#14141314' },
          dotted: { value: '#14141329' },
        },
        chart: {
          purple: { value: '#b29df8' },
          peach: { value: '#f4beb4' },
          maroon: { value: '#a75e6e' },
          teal: { value: '#5fa89a' },
          blue: { value: '#3f63a0' },
        },
      },
      fonts: {
        body: { value: '"Inter Variable", sans-serif' },
      },
      spacing: {
        4: { value: '4px' },
        8: { value: '8px' },
        12: { value: '12px' },
        16: { value: '16px' },
        24: { value: '24px' },
      },
      easings: {
        out: { value: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      },
      durations: {
        fast: { value: '200ms' },
        slow: { value: '1600ms' },
      },
      radii: {
        2: { value: '2px' },
        4: { value: '4px' },
        8: { value: '8px' },
        full: { value: '9999px' },
      },
    },
    keyframes: {
      pulse: {
        '50%': { opacity: '0.4' },
      },
    },
    textStyles: {
      title: {
        value: { fontFamily: 'body', fontSize: '35px', lineHeight: '1.25' },
      },
      body: {
        value: { fontFamily: 'body', fontSize: '14px', lineHeight: '20px' },
      },
      footnote: {
        value: { fontFamily: 'body', fontSize: '12px', lineHeight: '16px' },
      },
    },
  },
  globalCss: {
    body: {
      backgroundColor: 'background.primary',
      color: 'content.primary',
      textStyle: 'body',
    },
  },
})
