import { useRef, useState, useEffect } from 'react'
import { MoreHorizontal, Link2, Copy, FolderInput, CheckCircle2, Archive, Trash2, ChevronRight, ChevronDown } from 'lucide-react'
import { AvatarGroup } from '../primitives/AvatarGroup'
import styles from './TopicCard.module.css'

type Status = 'active' | 'decided' | 'resolved' | 'archived'

interface Member { name: string; color?: string }

interface Project { id: string; name: string }

interface TopicCardProps {
  title: string
  status: Status
  nodeCount: number
  taskCount: number
  description: string
  updatedAt: string
  members?: Member[]
  projects?: Project[]
  onClick?: () => void
}

const statusLabel: Record<Status, string> = {
  active:   'Active',
  decided:  'Decided',
  resolved: 'Resolved',
  archived: 'Archived',
}

const MENU_ITEMS = [
  { icon: Link2,        label: 'Copy link',        action: 'copy-link' },
  { icon: Copy,         label: 'Duplicate',         action: 'duplicate' },
  { icon: FolderInput,  label: 'Move to project…',  action: 'move',    submenu: true },
  { icon: CheckCircle2, label: 'Mark as Resolved',  action: 'resolve' },
  { icon: Archive,      label: 'Archive',            action: 'archive' },
  { divider: true },
  { icon: Trash2,       label: 'Delete',             action: 'delete',  danger: true },
]

export function TopicCard({ title, status, nodeCount, taskCount, description, updatedAt, members = [], projects = [], onClick }: TopicCardProps) {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) { setSubMenuOpen(false); return }
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [menuOpen])

  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <button className={`${styles.badge} ${styles[`badge_${status}`]}`} onClick={e => e.stopPropagation()}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>{statusLabel[status]}</span>
            <ChevronDown size={11} strokeWidth={1.5} className={styles.badgeChevron} />
          </button>
          <span className={styles.nodeCount}>{nodeCount} nodes</span>
        </div>
        {members.length > 0 && (
          <AvatarGroup avatars={members} size="sm" max={3} />
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.footer}>
        <span className={styles.footerMeta}>{taskCount} tasks</span>
        <span className={styles.footerDot} />
        <span className={styles.footerMeta}>Updated {updatedAt}</span>
        <div className={styles.moreWrap} ref={menuRef}>
          <button
            className={styles.moreBtn}
            onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
          >
            <MoreHorizontal size={14} strokeWidth={1.5} />
          </button>
          {menuOpen && (
            <div className={styles.menu}>
              {MENU_ITEMS.map((item, i) =>
                'divider' in item ? (
                  <div key={i} className={styles.menuDivider} />
                ) : 'submenu' in item && item.submenu ? (
                  <div key={item.action} className={styles.menuItemWrap}>
                    <button
                      className={`${styles.menuItem} ${subMenuOpen ? styles.menuItemActive : ''}`}
                      onClick={e => { e.stopPropagation(); setSubMenuOpen(v => !v) }}
                    >
                      <item.icon size={12} strokeWidth={1.5} />
                      {item.label}
                      <ChevronRight
                        size={11}
                        strokeWidth={1.5}
                        className={`${styles.chevron} ${subMenuOpen ? styles.chevronOpen : ''}`}
                      />
                    </button>
                    {subMenuOpen && projects.length > 0 && (
                      <div className={styles.subMenu}>
                        {projects.map(p => (
                          <button
                            key={p.id}
                            className={styles.menuItem}
                            onClick={e => { e.stopPropagation(); setMenuOpen(false) }}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.action}
                    className={`${styles.menuItem} ${item.danger ? styles.menuItemDanger : ''}`}
                    onClick={e => { e.stopPropagation(); setMenuOpen(false) }}
                  >
                    <item.icon size={12} strokeWidth={1.5} />
                    {item.label}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
