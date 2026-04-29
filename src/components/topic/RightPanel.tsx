import { useState, useRef, useEffect } from 'react'
import { ThumbsUp, CornerUpLeft, Calendar, Plus, MoreVertical, ArrowRightCircle, Copy, Link, Trash2 } from 'lucide-react'
import { TabBar } from '../primitives/TabBar'
import { AvatarGroup } from '../primitives/AvatarGroup'
import { TaskCardModal } from '../project/TaskCardModal'
import type { TaskDetail } from '../project/TaskCardModal'
import { TaskCreationModal } from '../interactive/TaskCreationModal'
import type { NewActionItem } from '../interactive/TaskCreationModal'
import styles from './RightPanel.module.css'

interface Comment {
  id: string
  author: { name: string; color?: string }
  timestamp: string
  text: string
  likes?: number
  nodeRef?: string
  replies?: Comment[]
}

type Priority = 'urgent' | 'high' | 'medium' | 'low'
type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'

interface PanelTask {
  id: string
  title: string
  priority: Priority
  status: TaskStatus
  assignee: { name: string; color?: string }
  dueDate?: string
}

interface RightPanelProps {
  comments?: Comment[]
  tasks?: PanelTask[]
}

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: '1',
    author: { name: 'Anna Kim', color: 'var(--color-blue)' },
    timestamp: 'Apr 22, 10:30',
    text: "I've drafted the new color palette — v2 is in the brand guidelines doc. Please review before EOD.",
    likes: 2,
    replies: [
      {
        id: '1a',
        author: { name: 'Max Rivera', color: 'var(--color-green)' },
        timestamp: 'Apr 22, 11:04',
        text: 'Looks great overall. One note — secondary blue might not pass AA contrast on light backgrounds.',
        likes: 1,
      },
      {
        id: '1b',
        author: { name: 'Anna Kim', color: 'var(--color-blue)' },
        timestamp: 'Apr 22, 11:22',
        text: "Good catch. I'll run it through the contrast checker and update before sending to the agency.",
        likes: 0,
      },
    ],
  },
  {
    id: '2',
    author: { name: 'Jake Lee', color: 'var(--color-orange)' },
    timestamp: 'Apr 23, 09:00',
    text: "Talked to legal — minimum 5 business days for the logo review. June 15 is at risk if we don't escalate today.",
    likes: 3,
    nodeRef: 'Legal review pending on new logo',
    replies: [
      {
        id: '2a',
        author: { name: 'Dana Song', color: 'var(--color-purple)' },
        timestamp: 'Apr 23, 09:45',
        text: "I've pinged Sarah directly — she has a contact in legal who can expedite. Waiting to hear back.",
        likes: 2,
      },
      {
        id: '2b',
        author: { name: 'Jake Lee', color: 'var(--color-orange)' },
        timestamp: 'Apr 23, 10:12',
        text: "Also flagged it in the #legal-requests channel. Let's see which path moves faster.",
        likes: 1,
      },
    ],
  },
  {
    id: '3',
    author: { name: 'Alex Kim', color: 'var(--color-blue)' },
    timestamp: 'Apr 23, 13:00',
    text: 'Design tokens are locked. Figma library has been updated — devs can start pulling from the new variables.',
    likes: 4,
  },
  {
    id: '4',
    author: { name: 'Max Rivera', color: 'var(--color-green)' },
    timestamp: 'Apr 23, 15:30',
    text: 'Quick question — are we standardizing the typography scale for email templates too, or is that a separate effort?',
    likes: 0,
    replies: [
      {
        id: '4a',
        author: { name: 'Dana Song', color: 'var(--color-purple)' },
        timestamp: 'Apr 23, 16:05',
        text: "Email templates are in scope but on a separate timeline — targeting end of May. Let's not block the main launch on it.",
        likes: 2,
      },
    ],
  },
  {
    id: '5',
    author: { name: 'Dana Song', color: 'var(--color-purple)' },
    timestamp: 'Apr 24, 09:15',
    text: 'Brand guidelines doc is published and shared with the agency. They confirmed receipt and will send first concepts by Apr 27.',
    likes: 3,
  },
  {
    id: '6',
    author: { name: 'Jake Lee', color: 'var(--color-orange)' },
    timestamp: 'Apr 24, 14:00',
    text: 'Update from legal: they need 3 more days on top of the original estimate. Review now wraps May 1 at earliest.',
    likes: 1,
    nodeRef: 'Legal review pending on new logo',
  },
]

const DEFAULT_TASKS: PanelTask[] = [
  { id: '1', title: 'Get legal sign-off on logo',    priority: 'urgent', status: 'in-progress', assignee: { name: 'Jake Lee',   color: 'var(--color-orange)' }, dueDate: 'May 28' },
  { id: '2', title: 'Update brand guidelines doc',   priority: 'high',   status: 'in-progress', assignee: { name: 'Alex Kim',   color: 'var(--color-blue)'   }, dueDate: 'Jun 1'  },
  { id: '3', title: 'Color palette v2',              priority: 'high',   status: 'review',      assignee: { name: 'Alex Kim',   color: 'var(--color-blue)'   }                   },
  { id: '4', title: 'Brief external agency',         priority: 'medium', status: 'todo',        assignee: { name: 'Max Rivera', color: 'var(--color-green)'  }                   },
  { id: '5', title: 'Design new email templates',    priority: 'low',    status: 'todo',        assignee: { name: 'Alex Kim',   color: 'var(--color-blue)'   }                   },
]

const PRIORITY_COLOR: Record<Priority, string> = {
  urgent: 'var(--color-red)',
  high:   'var(--color-orange)',
  medium: 'var(--color-blue)',
  low:    'var(--text-disabled)',
}

const STATUS_LABEL: Record<TaskStatus, string> = {
  'todo':        'To Do',
  'in-progress': 'In Progress',
  'review':      'Review',
  'done':        'Done',
}

const STATUS_COLOR: Record<TaskStatus, string> = {
  'todo':        'var(--text-tertiary)',
  'in-progress': 'var(--color-blue)',
  'review':      'var(--color-orange)',
  'done':        'var(--color-green)',
}

function CommentItem({ c, isReply = false }: { c: Comment; isReply?: boolean }) {
  return (
    <div className={`${styles.comment} ${isReply ? styles.commentReply : ''}`}>
      <div className={styles.commentHeader}>
        <AvatarGroup avatars={[c.author]} size="sm" max={1} />
        <span className={styles.commentAuthor}>{c.author.name}</span>
        <span className={styles.commentTime}>{c.timestamp}</span>
      </div>
      {c.nodeRef && (
        <div className={styles.nodeRef}>
          <span className={styles.nodeRefDot} />
          <span className={styles.nodeRefText}>re: {c.nodeRef}</span>
        </div>
      )}
      <p className={styles.commentText}>{c.text}</p>
      <div className={styles.commentActions}>
        <button className={styles.actionBtn}>
          <CornerUpLeft size={11} strokeWidth={1.5} />
          Reply
        </button>
        <button className={styles.actionBtn}>
          <ThumbsUp size={11} strokeWidth={1.5} />
          {c.likes ?? 0}
        </button>
      </div>
      {c.replies && c.replies.length > 0 && (
        <div className={styles.replies}>
          {c.replies.map(r => (
            <CommentItem key={r.id} c={r} isReply />
          ))}
        </div>
      )}
    </div>
  )
}

function countComments(comments: Comment[]): number {
  return comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0)
}

function PanelTaskCard({ t, onOpen }: { t: PanelTask; onOpen: () => void }) {
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
    <div className={styles.taskCard} onClick={onOpen}>
      <div className={styles.taskPriority}>
        <span className={styles.taskPriorityDot} style={{ background: PRIORITY_COLOR[t.priority] }} />
        <span className={styles.taskPriorityLabel} style={{ color: PRIORITY_COLOR[t.priority] }}>
          {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
        </span>
      </div>

      <div ref={menuRef} className={styles.taskCardMenu} onClick={e => e.stopPropagation()}>
        <button className={styles.taskCardMenuBtn} onClick={() => setMenuOpen(v => !v)}>
          <MoreVertical size={13} strokeWidth={1.5} />
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

      <p className={styles.taskTitle}>{t.title}</p>
      <span className={styles.taskTopicTag} style={{ color: STATUS_COLOR[t.status], background: `color-mix(in srgb, ${STATUS_COLOR[t.status]} 12%, transparent)` }}>
        {STATUS_LABEL[t.status]}
      </span>
      <div className={styles.taskFooter}>
        <AvatarGroup avatars={[t.assignee]} size="sm" max={1} />
        {t.dueDate && (
          <span className={styles.taskDue}>
            <Calendar size={10} strokeWidth={1.5} />
            {t.dueDate}
          </span>
        )}
      </div>
    </div>
  )
}

export function RightPanel({
  comments = DEFAULT_COMMENTS,
  tasks: initialTasks = DEFAULT_TASKS,
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState('comments')
  const [draft, setDraft] = useState('')
  const [tasks, setTasks] = useState<PanelTask[]>(initialTasks)
  const [creating, setCreating] = useState(false)
  const [modalTask, setModalTask] = useState<TaskDetail | null>(null)

  function openTask(t: PanelTask) {
    setModalTask({
      id:          t.id,
      title:       t.title,
      description: '',
      priority:    t.priority,
      status:      t.status,
      topic:       'Rebrand Launch',
      assignee:    t.assignee,
      dueDate:     t.dueDate,
      createdBy:   t.assignee.name,
      createdAt:   'Apr 20',
    })
  }

  function addTask(item: NewActionItem) {
    setTasks(prev => [
      ...prev,
      {
        id:       item.id,
        title:    item.title,
        priority: item.priority,
        status:   'todo',
        assignee: item.assignee ?? { name: 'Eugene Z.', color: 'var(--color-blue)' },
        dueDate:  item.dueDate,
      },
    ])
    setCreating(false)
  }

  const activeTasks = tasks.filter(t => t.status !== 'done')

  return (
    <aside className={styles.panel}>
      {modalTask && <TaskCardModal task={modalTask} onClose={() => setModalTask(null)} />}
      <div className={styles.tabs}>
        <TabBar
          tabs={[
            { key: 'comments', label: 'Comments', count: countComments(comments) },
            { key: 'tasks',    label: 'Tasks',    count: activeTasks.length },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className={styles.body}>
        {activeTab === 'comments' && (
          <div className={styles.commentsSection}>
            <div className={styles.commentsList}>
              {comments.map(c => (
                <CommentItem key={c.id} c={c} />
              ))}
            </div>

            <div className={styles.commentInput}>
              <input
                className={styles.inputField}
                placeholder="Write a comment… @node to reference"
                value={draft}
                onChange={e => setDraft(e.target.value)}
              />
              {draft && (
                <button className={styles.sendBtn} onClick={() => setDraft('')}>Send</button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className={styles.tasksSection}>
            <div className={styles.taskList}>
              {activeTasks.map(t => (
                <PanelTaskCard key={t.id} t={t} onOpen={() => openTask(t)} />
              ))}
            </div>

            <div className={styles.createTaskWrap}>
              <button className={`sg-btn sg-btn--secondary sg-btn--md ${styles.createTaskBtn}`} onClick={() => setCreating(true)}>
                <Plus size={14} strokeWidth={1.5} />
                <span className="sg-btn-text">Create task</span>
              </button>
            </div>

            <TaskCreationModal
              isOpen={creating}
              onClose={() => setCreating(false)}
              onAddTask={addTask}
            />
          </div>
        )}
      </div>
    </aside>
  )
}
