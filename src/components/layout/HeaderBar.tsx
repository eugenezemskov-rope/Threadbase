import { ScanSearch } from 'lucide-react'
import { Breadcrumb } from '../primitives/Breadcrumb'
import { AvatarGroup } from '../primitives/AvatarGroup'
import styles from './HeaderBar.module.css'

interface Member { name: string; color?: string }

interface HeaderBarProps {
  projectName?: string
  stats?: string
  members?: Member[]
  triageCount?: number
  activeView?: 'topics' | 'tasks'
  onViewChange?: (view: 'topics' | 'tasks') => void
  onTriageOpen?: () => void
  breadcrumb?: { label: string; onClick?: () => void }[]
  rightSlot?: React.ReactNode
}

export function HeaderBar({
  projectName,
  stats,
  members = [],
  triageCount = 0,
  activeView = 'topics',
  onViewChange,
  onTriageOpen,
  breadcrumb,
  rightSlot,
}: HeaderBarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {breadcrumb ? (
          <Breadcrumb items={breadcrumb} />
        ) : (
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{projectName}</h1>
          </div>
        )}
      </div>

      <div className={styles.center}>
        {onViewChange && (
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleBtn} ${activeView === 'topics' ? styles.toggleBtnActive : ''}`}
              onClick={() => onViewChange('topics')}
            >
              Topic Space
            </button>
            <button
              className={`${styles.toggleBtn} ${activeView === 'tasks' ? styles.toggleBtnActive : ''}`}
              onClick={() => onViewChange('tasks')}
            >
              Task Board
            </button>
          </div>
        )}
      </div>

      <div className={styles.right}>
        {members.length > 0 && (
          <AvatarGroup avatars={members} size="sm" max={5} />
        )}
        {rightSlot}
        {onTriageOpen && (
          <button className={styles.triageBtn} onClick={onTriageOpen}>
            <ScanSearch size={14} strokeWidth={1.5} />
            <span className={styles.triageBtnText}>Context Triage</span>
            {triageCount > 0 && (
              <span className={`${styles.triageBadge} ${String(triageCount).length === 1 ? styles.triageBadgeCircle : ''}`}>
                {triageCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  )
}
