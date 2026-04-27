import { LayoutDashboard, FolderKanban, CheckSquare, ChevronRight, Plug } from 'lucide-react'
import styles from './Sidebar.module.css'

interface Project {
  id: string
  name: string
  active?: boolean
}

interface SidebarProps {
  projects?: Project[]
  activeProjectId?: string
  onProjectClick?: (id: string) => void
  mode?: 'project' | 'topic'
  topics?: { id: string; name: string; active?: boolean }[]
  onTopicClick?: (id: string) => void
  onBackClick?: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FolderKanban,    label: 'Projects',  active: true },
  { icon: CheckSquare,     label: 'My Tasks' },
]

export function Sidebar({
  projects = [],
  activeProjectId,
  onProjectClick,
  mode = 'project',
  topics = [],
  onTopicClick,
  onBackClick,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={`${import.meta.env.BASE_URL}img/Logo.svg`} alt="ThreadBase" className={styles.logoImg} />
      </div>

      <nav className={styles.nav}>
        <span className={styles.sectionLabel}>Navigation</span>
        {navItems.map(item => (
          <button key={item.label} className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}>
            <item.icon size={14} strokeWidth={1.5} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {mode === 'topic' && (
        <button className={styles.backLink} onClick={onBackClick}>
          <ChevronRight size={12} strokeWidth={1.5} className={styles.backChevron} />
          Back to Project
        </button>
      )}

      <div className={styles.section}>
        <span className={styles.sectionLabel}>
          {mode === 'topic' ? 'Topics in Project' : 'My Projects'}
        </span>
        {mode === 'project' && projects.map(p => (
          <button
            key={p.id}
            className={`${styles.projectItem} ${p.id === activeProjectId ? styles.projectItemActive : ''}`}
            onClick={() => onProjectClick?.(p.id)}
          >
            <span className={`${styles.projectDot} ${p.id === activeProjectId ? styles.projectDotActive : ''}`} />
            <span>{p.name}</span>
          </button>
        ))}
        {mode === 'topic' && topics.map(t => (
          <button
            key={t.id}
            className={`${styles.projectItem} ${t.active ? styles.projectItemActive : ''}`}
            onClick={() => onTopicClick?.(t.id)}
          >
            <span className={`${styles.projectDot} ${t.active ? styles.projectDotActive : ''}`} />
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.bottom}>
        <button className={styles.bottomItem}>
          <Plug size={14} strokeWidth={1.5} />
          <span>Integrations</span>
        </button>
        <button className={styles.bottomItem}>
          <div className={styles.avatar}>E</div>
          <span>Eugene Z.</span>
        </button>
      </div>
    </aside>
  )
}
