import { Plus, Search, Calendar, CheckSquare, MoreHorizontal, ArrowRightCircle, Copy, Link, Trash2, MessageSquare, Inbox, CheckCircle2, UserPlus, Tag, CornerDownRight, Pencil, Archive, Pin } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { AvatarGroup } from '../components/primitives/AvatarGroup'
import { TaskCardModal } from '../components/project/TaskCardModal'
import type { TaskDetail } from '../components/project/TaskCardModal'
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

type ActivityType = 'comment' | 'suggestion' | 'decision' | 'task' | 'topic'

interface ActivityItem {
  id: string
  type: ActivityType
  actor: { name: string; color: string }
  verb: string
  subject: string
  subjectBold?: boolean
  time: string
  preview?: string
  replies?: { count: number; avatars: { name: string; color: string }[] }
}

const ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    type: 'comment',
    actor: { name: 'Max Rivera', color: 'var(--color-green)' },
    verb: 'replied to your comment in',
    subject: 'Rebrand Launch',
    subjectBold: true,
    time: '2h ago',
    preview: '"Palette looks solid. Secondary blue might not pass AA on light backgrounds."',
    replies: { count: 6, avatars: [{ name: 'Anna Kim', color: 'var(--color-blue)' }, { name: 'Jake Lee', color: 'var(--color-orange)' }] },
  },
  {
    id: '2',
    type: 'suggestion',
    actor: { name: 'System', color: 'var(--color-blue)' },
    verb: '3 new context suggestions in',
    subject: 'Product Launch',
    subjectBold: true,
    time: '3h ago',
    preview: 'From Product Sync Call recording',
  },
  {
    id: '3',
    type: 'decision',
    actor: { name: 'Dana Song', color: 'var(--color-purple)' },
    verb: 'recorded a decision in',
    subject: 'Q3 Budget Review',
    subjectBold: true,
    time: '5h ago',
    preview: 'Budget allocated for external agency — $45k approved.',
  },
  {
    id: '4',
    type: 'task',
    actor: { name: 'Alex Kim', color: 'var(--color-blue)' },
    verb: 'assigned you a task in',
    subject: 'Rebrand Launch',
    subjectBold: true,
    time: '1d ago',
    preview: 'Update brand guidelines doc · Due Jun 1',
  },
  {
    id: '5',
    type: 'topic',
    actor: { name: 'Dana Song', color: 'var(--color-purple)' },
    verb: 'added you to',
    subject: 'API v3 Migration',
    subjectBold: true,
    time: '1d ago',
  },
  {
    id: '6',
    type: 'comment',
    actor: { name: 'Jake Lee', color: 'var(--color-orange)' },
    verb: 'commented in',
    subject: 'API v3 Migration',
    subjectBold: true,
    time: '2d ago',
    preview: '"Breaking change list is ready for review."',
    replies: { count: 3, avatars: [{ name: 'Dana Song', color: 'var(--color-purple)' }, { name: 'Alex Kim', color: 'var(--color-blue)' }] },
  },
]

const ACTIVITY_ICON: Record<ActivityType, React.ReactNode> = {
  comment:    <MessageSquare size={11} strokeWidth={1.5} />,
  suggestion: <Inbox         size={11} strokeWidth={1.5} />,
  decision:   <CheckCircle2  size={11} strokeWidth={1.5} />,
  task:       <Tag           size={11} strokeWidth={1.5} />,
  topic:      <UserPlus      size={11} strokeWidth={1.5} />,
}

const ACTIVITY_ICON_COLOR: Record<ActivityType, string> = {
  comment:    'var(--color-blue)',
  suggestion: 'var(--color-orange)',
  decision:   'var(--color-green)',
  task:       'var(--color-purple)',
  topic:      'var(--color-blue)',
}

interface Project {
  id: string; name: string; color: string; topicCount: number; taskCount: number
  memberCount: number; triageCount: number; updatedAt: string
  members: { name: string; color: string }[]
}

function ProjectCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <>
      <div className={styles.projectCard} onClick={onClick}>
        <div className={styles.projectCardAccent} style={{ background: p.color }} />
        <div className={styles.projectCardBody}>
          <div ref={menuRef} className={styles.projectCardMenu} onClick={e => e.stopPropagation()}>
            <button className={styles.projectCardMenuBtn} onClick={() => setMenuOpen(v => !v)}>
              <MoreHorizontal size={13} strokeWidth={1.5} />
            </button>
            {menuOpen && (
              <div className={styles.projectCardDropdown}>
                <button className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  <Pencil size={13} strokeWidth={1.5} />
                  Rename
                </button>
                <button className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  <Copy size={13} strokeWidth={1.5} />
                  Duplicate
                </button>
                <button className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  <Pin size={13} strokeWidth={1.5} />
                  Pin to top
                </button>
                <button className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  <Archive size={13} strokeWidth={1.5} />
                  Archive
                </button>
                <div className={styles.dropdownSeparator} />
                <button className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} onClick={() => { setMenuOpen(false); setConfirmDelete(true) }}>
                  <Trash2 size={13} strokeWidth={1.5} />
                  Delete
                </button>
              </div>
            )}
          </div>
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
      </div>

      {confirmDelete && (
        <div className={styles.confirmBackdrop} onClick={() => setConfirmDelete(false)}>
          <div className={styles.confirmDialog} onClick={e => e.stopPropagation()}>
            <h4 className={styles.confirmTitle}>Delete "{p.name}"?</h4>
            <p className={styles.confirmText}>This will permanently delete the project and all its topics and tasks.</p>
            <div className={styles.confirmActions}>
              <button className="sg-btn sg-btn--secondary sg-btn--md" onClick={() => setConfirmDelete(false)}>
                <span className="sg-btn-text">Cancel</span>
              </button>
              <button
                className="sg-btn sg-btn--primary sg-btn--md"
                style={{ background: 'var(--color-red)', borderColor: 'var(--color-red)' }}
                onClick={() => setConfirmDelete(false)}
              >
                <span className="sg-btn-text">Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function HomeTaskCard({ t, onOpen }: { t: MyTask; onOpen: (t: MyTask) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <div className={styles.taskCard} onClick={() => onOpen(t)}>
      <div className={styles.taskCardPriority}>
        <span className={styles.taskPriorityDot} style={{ background: PRIORITY_COLOR[t.priority] }} />
        <span className={styles.taskPriorityLabel} style={{ color: PRIORITY_COLOR[t.priority] }}>
          {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
        </span>
      </div>

      <div ref={menuRef} className={styles.taskCardMenu} onClick={e => e.stopPropagation()}>
        <button className={styles.taskCardMenuBtn} onClick={() => setMenuOpen(v => !v)}>
          <MoreHorizontal size={13} strokeWidth={1.5} />
        </button>
        {menuOpen && (
          <div className={styles.taskCardDropdown}>
            <button className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
              <ArrowRightCircle size={13} strokeWidth={1.5} />
              Move to topic
            </button>
            <button className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
              <Copy size={13} strokeWidth={1.5} />
              Duplicate
            </button>
            <button className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
              <Link size={13} strokeWidth={1.5} />
              Copy link
            </button>
            <div className={styles.dropdownSeparator} />
            <button className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} onClick={() => setMenuOpen(false)}>
              <Trash2 size={13} strokeWidth={1.5} />
              Delete
            </button>
          </div>
        )}
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
  )
}

interface HomePageProps {
  onProjectClick?: (id: string) => void
  onTasksClick?: () => void
}

export function HomePage({ onProjectClick, onTasksClick }: HomePageProps) {
  const [modalTask, setModalTask] = useState<TaskDetail | null>(null)
  const [_readItems, setReadItems] = useState<Set<string>>(new Set())

  function openTask(t: MyTask) {
    setModalTask({
      id:          t.id,
      title:       t.title,
      description: '',
      priority:    t.priority,
      status:      t.status === 'done' ? 'done' : t.status === 'in-progress' ? 'in-progress' : 'todo',
      topic:       t.topic,
      assignee:    { name: 'Eugene Z.', color: 'var(--color-blue)' },
      dueDate:     t.dueDate,
      createdBy:   'Eugene Z.',
      createdAt:   'Apr 20',
    })
  }

  return (
    <div className={styles.page}>
      {modalTask && <TaskCardModal task={modalTask} onClose={() => setModalTask(null)} />}
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <img src={`${import.meta.env.BASE_URL}img/Logo.svg`} alt="ThreadBase" className={styles.logo} />
          <div className={styles.searchWrap}>
            <Search size={13} strokeWidth={1.5} className={styles.searchIcon} />
            <input className={styles.searchInput} placeholder="Search topics, nodes, decisions…" />
          </div>
        </div>
        <div className={styles.topBarRight}>
          <button className="sg-btn sg-btn--primary sg-btn--md" onClick={onTasksClick}>
            <CheckSquare size={14} strokeWidth={1.5} />
            <span className="sg-btn-text">My Tasks</span>
          </button>
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
              <div className={styles.columnScrollWrap}>
              <div className={styles.columnScroll}>
                <div className={styles.projectsGrid}>
                  {PROJECTS.map(p => (
                    <ProjectCard key={p.id} p={p} onClick={() => onProjectClick?.(p.id)} />
                  ))}
                </div>
              </div>
              </div>
            </div>

            <div className={styles.tasksColumn}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>My Tasks</span>
                <button className={styles.sectionAction} onClick={onTasksClick}>View all</button>
              </div>
              <div className={styles.sectionDivider} />
              <div className={styles.columnScrollWrap}>
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
                  <HomeTaskCard key={t.id} t={t} onOpen={openTask} />
                ))}
              </div>
              </div>
              </div>
            </div>

            <div className={styles.activityColumn}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>Recent Activity</span>
                <button className={styles.sectionAction} onClick={() => setReadItems(new Set(ACTIVITY.map(a => a.id)))}>Clear feed</button>
              </div>
              <div className={styles.sectionDivider} />
              <div className={styles.columnScrollWrap}>
              <div className={`${styles.columnScroll} ${styles.columnScrollFeed}`}>
                <div className={styles.activityList}>
                  {ACTIVITY.map(a => (
                    <div key={a.id} className={styles.activityItem}>
                      <div className={styles.activityTimeline}>
                        <div
                          className={styles.activityIcon}
                          style={{ color: ACTIVITY_ICON_COLOR[a.type], background: `color-mix(in srgb, ${ACTIVITY_ICON_COLOR[a.type]} 12%, var(--bg-elevated))` }}
                        >
                          {ACTIVITY_ICON[a.type]}
                        </div>
                        <div className={styles.activityLine} />
                      </div>
                      <div className={styles.activityContent}>
                        <div className={styles.activityRow}>
                          <AvatarGroup avatars={[a.actor]} size="sm" max={1} />
                          <p className={styles.activityText}>
                            <span className={styles.activityActor}>{a.actor.name}</span>
                            {' '}{a.verb}{' '}
                            {a.subjectBold
                              ? <span className={styles.activitySubject}>{a.subject}</span>
                              : a.subject}
                          </p>
                          <span className={styles.activityTime}>{a.time}</span>
                        </div>
                        {a.preview && (
                          <div className={styles.activityPreview}>{a.preview}</div>
                        )}
                        {a.replies && (
                          <button className={styles.activityReplies}>
                            <CornerDownRight size={12} strokeWidth={1.5} className={styles.activityRepliesIcon} />
                            <AvatarGroup avatars={a.replies.avatars} size="sm" max={2} />
                            <span>View {a.replies.count} more replies</span>
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
    </div>
  )
}
