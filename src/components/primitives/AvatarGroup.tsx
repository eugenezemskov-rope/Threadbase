import { Plus } from 'lucide-react'
import styles from './AvatarGroup.module.css'

interface AvatarItem {
  name: string
  color?: string
  src?: string
}

interface AvatarGroupProps {
  avatars: AvatarItem[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
  onAdd?: () => void
  totalCount?: number
}

const defaultColors = [
  '#0A84FF', '#30D158', '#FF9F0A',
  '#BF5AF2', '#FF453A', '#40CBE0',
]

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function AvatarGroup({ avatars, max = 4, size = 'md', onAdd, totalCount }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max
  const overflowLabel = totalCount ?? overflow

  return (
    <div className={`${styles.group} ${styles[size]}`}>
      {visible.map((av, i) => (
        <div
          key={i}
          className={styles.avatar}
          style={{ background: av.color ?? defaultColors[i % defaultColors.length] }}
          title={av.name}
        >
          {av.src
            ? <img src={av.src} alt={av.name} className={styles.img} />
            : <span className={styles.initials}>{initials(av.name)}</span>
          }
        </div>
      ))}
      {(overflow > 0 || totalCount !== undefined) && (
        <div className={`${styles.avatar} ${styles.overflow}`}>
          <span className={`${styles.initials} ${String(overflowLabel).length > 1 ? styles.initialsLong : ''}`}>
            +{overflowLabel}
          </span>
        </div>
      )}
      {onAdd && (
        <button className={`${styles.avatar} ${styles.addBtn}`} onClick={onAdd} title="Add member">
          <Plus size={10} strokeWidth={2} className={styles.addIcon} />
        </button>
      )}
    </div>
  )
}
