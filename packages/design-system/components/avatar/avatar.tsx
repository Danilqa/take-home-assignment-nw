import * as styles from './avatar.styles'

function getInitials(name: string): string {
  const [first = '', ...rest] = name.trim().split(/\s+/)
  const last = rest.at(-1) ?? ''
  return (first.charAt(0) + last.charAt(0)).toUpperCase()
}

export interface AvatarProps {
  name: string
}

export function Avatar({ name }: AvatarProps) {
  return (
    <span aria-hidden className={styles.avatar}>
      {getInitials(name)}
    </span>
  )
}
