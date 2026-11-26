import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components/Button'
import * as styles from './button.styles'

export type ButtonProps = Omit<AriaButtonProps, 'className' | 'style'>

export function Button(props: ButtonProps) {
  return <AriaButton {...props} className={styles.button} />
}
