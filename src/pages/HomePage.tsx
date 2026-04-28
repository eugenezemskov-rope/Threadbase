import { Plus, ArrowRight, Search, Calendar } from 'lucide-react'
import { AvatarGroup } from '../components/primitives/AvatarGroup'
import styles from './HomePage.module.css'

const PROJECTS = [
  {
    id: 'product-launch',
    name: 'Product Launch',
    color: 'var(--color-blue)',
    topicCount: 8,
    taskCount: 12,
    memberCount: 4,
    triageCount: 5,
    updatedAt: '2h ago',
    members: [
      { name: 'Alex Kim',    color: 'var(--color-blue)' },
      { name: 'Sam Chen',    color: 'var(--color-green)' },
      { name: 'Jamie Lee',   color: 'var(--color-orange)' },
      { name: 'Morgan Park', color: 'var(--color-purple)' },
    ],
  },
  {
    id: 'platform-v2',
    name: 'Platform v2',
    color: 'var(--color-purple)',
    topicCount: 5,
    taskCount: 8,
    memberCount: 3,
    triageCount: 2,
    updatedAt: '4h ago',
    members: [
      { name: 'Alex Kim',  color: 'var(--color-blue)' },
      { name: 'Sam Chen',  color: 'var(--color-green)' },
      { name: 'Jamie Lee', color: 'var(--color-orange)' },
    ],
  },
  {
    id: 'growth',
    name: 'Growth Experiments',
    color: 'var(--color-green)',
    topicCount: 3,
    taskCount: 6,
    memberCount: 2,
    triageCount: 0,
    updatedAt: '1d ago',
    members: [
      { name: 'Alex Kim', color: 'var(--color-blue)' },
      { name: 'Sam Chen', color: 'var(--color-green)' },
    ],
  },
  {
    id: 'onboarding',
    name: 'Customer Onboarding',
    color: 'var(--color-orange)',
    topicCount: 4,
    taskCount: 9,
    memberCount: 3,
    triageCount: 1,
    updatedAt: '3h ago',
    members: [
      { name: 'Alex Kim',  color: 'var(--color-blue)' },
      { name: 'Sam Chen',  color: 'var(--color-green)' },
      { name: 'Jamie Lee', color: 'var(--color-orange)' },
    ],
  },
]

type TaskPriority = 'urgent' | 'high' | 'medium' | 'low'
type TaskStatus   = 'todo' | 'in-progress' | 'done'

interface MyTask {
  id: string
  title: string
  topic: string
  project: string
  priority: TaskPriority
  dueDate?: string
  status: TaskStatus
}

const MY_TASKS: MyTask[] = [
  { id: '1', title: 'Get legal sign-off on logo',     topic: 'Rebrand Launch',      project: 'Product Launch', priority: 'urgent', dueDate: 'May 28', status: 'in-progress' },
  { id: '2', title: 'Update brand guidelines doc',    topic: 'Rebrand Launch',      project: 'Product Launch', priority: 'high',   dueDate: 'Jun 1',  status: 'in-progress' },
  { id: '3', title: 'Brief external agency',          topic: 'Rebrand Launch',      project: 'Product Launch', priority: 'medium',                    status: 'todo'        },
  { id: '4', title: 'Review API breaking changes',    topic: 'API v3 Migration',    project: 'Platform v2',    priority: 'high',   dueDate: 'May 30', status: 'todo'        },
  { id: '5', title: 'Write onboarding copy',          topic: 'Customer Onboarding', project: 'Product Launch', priority: 'medium',                    status: 'todo'        },
  { id: '6', title: 'Competitive analysis doc',       topic: 'Growth Experiments',  project: 'Product Launch', priority: 'low',                       status: 'done'        },
  { id: '7', title: 'Finalize Q3 budget',             topic: 'Q3 Budget Review',    project: 'Product Launch', priority: 'high',                      status: 'done'        },
]

const PRIORITY_COLOR: Record<TaskPriority, string> = {
  urgent: 'var(--color-red)',
  high:   'var(--color-orange)',
  medium: 'var(--color-blue)',
  low:    'var(--text-disabled)',
}

const ACTIVITY = [
  {
    id: '1',
    title: 'Reply to your comment',
    body: 'Max Rivera replied in Rebrand Launch:',
    quote: '"Palette looks solid. Secondary blue might not pass AA on light backgrounds."',
    time: '2h ago',
    action: null,
  },
  {
    id: '2',
    title: '3 new context suggestions',
    body: 'Product Launch · from Product Sync Call',
    time: '3h ago',
    action: 'Open triage',
  },
  {
    id: '3',
    title: 'Decision made',
    body: 'Q3 Budget Review → Budget allocated.',
    time: '5h ago',
    action: 'View decision',
  },
  {
    id: '4',
    title: 'Task assigned to you',
    body: '"Update brand guidelines doc" in Rebrand Launch · Due Jun 1',
    time: '1d ago',
    action: null,
  },
  {
    id: '5',
    title: 'Reply in API v3 Migration',
    body: 'Jake Lee: "Breaking change list is ready for review."',
    time: '1d ago',
    action: null,
  },
  {
    id: '6',
    title: 'Node starred by Anna Kim',
    body: '"Launch date: June 15" in Rebrand Launch',
    time: '2d ago',
    action: null,
  },
]

interface HomePageProps {
  onProjectClick?: (id: string) => void
}

export function HomePage({ onProjectClick }: HomePageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <img src={`${import.meta.env.BASE_URL}img/Logo.svg`} alt="ThreadBase" className={styles.logo} />
        <div className={styles.searchWrap}>
          <Search size={13} strokeWidth={1.5} className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search topics, nodes, decisions…" />
        </div>
        <div className={styles.topBarRight}>
          <button className={styles.profileBtn}>
            <div className={styles.profileAvatar}>E</div>
            <span className={styles.profileName}>Eugene Z.</span>
          </button>
        </div>
      </header>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.greeting}>
            <h1 className={styles.greetingTitle}>Good morning, Eugene</h1>
            <p className={styles.greetingSubtitle}>
              You have 3 unread replies and 4 new context suggestions across your projects.
            </p>
          </div>

          <div className={styles.columns}>
            <div className={styles.projectsColumn}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>My Projects</span>
                <button className={styles.sectionAction}>
                  <Plus size={11} strokeWidth={1.5} />
                  New project
                </button>
              </div>
              <div className={styles.sectionDivider} />

              <div className={styles.columnScroll}>
                <div className={styles.projectsGrid}>
                  {PROJECTS.map(p => (
                    <button
                      key={p.id}
                      className={styles.projectCard}
                      onClick={() => onProjectClick?.(p.id)}
                    >
                      <div className={styles.projectCardAccent} style={{ background: p.color }} />
                      <div className={styles.projectCardBody}>
                        <span className={styles.projectCardName}>{p.name}</span>
                        <div className={styles.projectCardMeta}>
                          <span>{p.topicCount} topics</span>
                          <span className={styles.metaDot}>·</span>
                          <span>{p.taskCount} tasks</span>
                          <span className={styles.metaDot}>·</span>
                          <span>{p.memberCount} members</span>
                        </div>
                        {p.triageCount > 0 ? (
                          <div className={styles.triageBadge}>
                            <span className={styles.triageDot} />
                            <span className={styles.triageBadgeText}>{p.triageCount} to triage</span>
                          </div>
                        ) : (
                          <span className={styles.allReviewed}>✓ All reviewed</span>
                        )}
                        <div className={styles.projectCardFooter}>
                          <span className={styles.updatedAt}>Updated {p.updatedAt}</span>
                          <AvatarGroup avatars={p.members} size="sm" max={3} totalCount={p.memberCount} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.tasksColumn}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>My Tasks</span>
                <button className={styles.sectionAction}>View all</button>
              </div>
              <div className={styles.sectionDivider} />

              <div className={styles.columnScroll}>
              <div className={styles.taskCardList}>
                {MY_TASKS
                  .filter(t => t.status !== 'done')
                  .sort((a, b) => {
                    if (!a.dueDate && !b.dueDate) return 0
                    if (!a.dueDate) return 1
                    if (!b.dueDate) return -1
                    return new Date(`${a.dueDate} 2026`).getTime() - new Date(`${b.dueDate} 2026`).getTime()
                  })
                  .map(t => (
                  <div key={t.id} className={styles.taskCard}>
                    <div className={styles.taskCardPriority}>
                      <span className={styles.taskPriorityDot} style={{ background: PRIORITY_COLOR[t.priority] }} />
                      <span className={styles.taskPriorityLabel} style={{ color: PRIORITY_COLOR[t.priority] }}>
                        {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                      </span>
                    </div>
                    <p className={styles.taskCardTitle}>{t.title}</p>
                    <span className={styles.taskTopicTag}>{t.topic}</span>
                    <div className={styles.taskCardFooter}>
                      <AvatarGroup avatars={[{ name: 'Eugene Z.', color: 'var(--color-blue)' }]} size="sm" max={1} />
                      {t.dueDate && (
                        <span className={`${styles.taskCardDue} ${t.priority === 'urgent' ? styles.taskCardDueUrgent : ''}`}>
                          <Calendar size={10} strokeWidth={1.5} />
                          {t.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>

            <div className={styles.activityColumn}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>Recent Activity</span>
                <button className={styles.sectionAction}>View all</button>
              </div>
              <div className={styles.sectionDivider} />

              <div className={styles.columnScroll}>
                <div className={styles.activityList}>
                  {ACTIVITY.map(a => (
                    <div key={a.id} className={styles.activityItem}>
                      <div className={styles.activityDot} />
                      <div className={styles.activityContent}>
                        <div className={styles.activityHeader}>
                          <span className={styles.activityTitle}>{a.title}</span>
                          <span className={styles.activityTime}>{a.time}</span>
                        </div>
                        <p className={styles.activityBody}>{a.body}</p>
                        {a.quote && <p className={styles.activityQuote}>{a.quote}</p>}
                        {a.action && (
                          <button className={styles.activityAction}>
                            {a.action}
                            <ArrowRight size={10} strokeWidth={1.5} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
