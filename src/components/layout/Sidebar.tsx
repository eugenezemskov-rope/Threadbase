import { useState, useEffect } from 'react'
import { Home, CheckSquare, Plug, ChevronRight } from 'lucide-react'
import styles from './Sidebar.module.css'

interface Topic {
  id: string
  name: string
}

interface Project {
  id: string
  name: string
  topics: Topic[]
}

const PROJECTS: Project[] = [
  {
    id: 'product-launch',
    name: 'Product Launch',
    topics: [
      { id: 't1', name: 'Rebrand Launch' },
      { id: 't2', name: 'API v3 Migration' },
      { id: 't3', name: 'Q3 Budget Review' },
      { id: 't4', name: 'Onboarding Revamp' },
      { id: 't5', name: 'Mobile App Beta' },
    ],
  },
  {
    id: 'platform-v2',
    name: 'Platform v2',
    topics: [
      { id: 't6', name: 'Platform Architecture' },
      { id: 't7', name: 'API Gateway' },
      { id: 't8', name: 'DevOps Pipeline' },
    ],
  },
  {
    id: 'growth',
    name: 'Growth Experiments',
    topics: [
      { id: 't9',  name: 'Pricing Page Redesign' },
      { id: 't10', name: 'SEO Optimization' },
      { id: 't11', name: 'Referral Program' },
    ],
  },
  {
    id: 'onboarding',
    name: 'Customer Onboarding',
    topics: [
      { id: 't12', name: 'Onboarding Flow' },
      { id: 't13', name: 'Help Center Redesign' },
    ],
  },
]

interface SidebarProps {
  activeNav?: 'home' | 'tasks' | 'projects'
  activeProjectId?: string | null
  activeTopicId?: string | null
  onHomeClick?: () => void
  onTasksClick?: () => void
  onProjectClick?: (id: string) => void
  onTopicClick?: (projectId: string, topicId: string) => void
}

export function Sidebar({
  activeNav = 'home',
  activeProjectId,
  activeTopicId,
  onHomeClick,
  onTasksClick,
  onProjectClick,
  onTopicClick,
}: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    activeProjectId ? { [activeProjectId]: true } : {}
  )

  useEffect(() => {
    if (activeProjectId) setExpanded({ [activeProjectId]: true })
  }, [activeProjectId])

  useEffect(() => {
    if (activeTopicId) {
      const project = PROJECTS.find(p => p.topics.some(t => t.id === activeTopicId))
      if (project) setExpanded({ [project.id]: true })
    }
  }, [activeTopicId])

  return (
    <aside className={styles.sidebar}>
      <button className={styles.logo} onClick={onHomeClick}>
        <img src={`${import.meta.env.BASE_URL}img/Logo.svg`} alt="ThreadBase" className={styles.logoImg} />
      </button>

      <nav className={styles.nav}>
        <span className={styles.sectionLabel}>Navigation</span>
        <button
          className={`${styles.navItem} ${activeNav === 'home' ? styles.navItemActive : ''}`}
          onClick={onHomeClick}
        >
          <Home size={14} strokeWidth={1.5} />
          <span>Home</span>
        </button>
        <button
          className={`${styles.navItem} ${activeNav === 'tasks' ? styles.navItemActive : ''}`}
          onClick={onTasksClick}
        >
          <CheckSquare size={14} strokeWidth={1.5} />
          <span>My Tasks</span>
        </button>
      </nav>

      <div className={styles.divider} />

      <div className={styles.projectsScroll}>
        <span className={styles.sectionLabel}>My Projects</span>
        {PROJECTS.map(p => {
          const isActive = p.id === activeProjectId
          const isOpen   = !!expanded[p.id]
          return (
            <div key={p.id} className={styles.projectGroup}>
              <div className={`${styles.projectRow} ${isActive ? styles.projectRowActive : ''}`}>
                <button
                  className={styles.projectChevronBtn}
                  onClick={() => setExpanded(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                >
                  <ChevronRight
                    size={12}
                    strokeWidth={1.5}
                    className={`${styles.projectChevron} ${isOpen ? styles.projectChevronOpen : ''}`}
                  />
                </button>
                <button
                  className={styles.projectNameBtn}
                  onClick={() => onProjectClick?.(p.id)}
                >
                  {p.name}
                </button>
              </div>

              {isOpen && (
                <div className={styles.topicList}>
                  {p.topics.map(t => (
                    <button
                      key={t.id}
                      className={`${styles.topicItem} ${t.id === activeTopicId ? styles.topicItemActive : ''}`}
                      onClick={() => onTopicClick?.(p.id, t.id)}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className={styles.divider} />

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
