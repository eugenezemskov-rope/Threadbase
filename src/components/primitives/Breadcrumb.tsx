import { Home, ChevronRight } from 'lucide-react'
import styles from './Breadcrumb.module.css'

interface CrumbItem {
  label: string
  onClick?: () => void
}

interface BreadcrumbProps {
  items: CrumbItem[]
  maxVisible?: number
}

export function Breadcrumb({ items, maxVisible = 3 }: BreadcrumbProps) {
  const collapse = items.length > maxVisible + 1

  let visible: (CrumbItem | null)[] = items
  if (collapse) {
    visible = [
      items[0],
      null, // ellipsis
      ...items.slice(-(maxVisible - 1)),
    ]
  }

  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      <button className={styles.homeBtn} aria-label="Home">
        <Home size={13} strokeWidth={1.5} />
      </button>

      {visible.map((item, i) => (
        <span key={i} className={styles.segment}>
          <ChevronRight size={12} strokeWidth={1.5} className={styles.sep} />
          {item === null ? (
            <span className={styles.ellipsis}>…</span>
          ) : i === visible.length - 1 ? (
            <span className={styles.current}>{item.label}</span>
          ) : (
            <button className={styles.link} onClick={item.onClick}>
              {item.label}
            </button>
          )}
        </span>
      ))}
    </nav>
  )
}
