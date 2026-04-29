import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Calendar, MessageSquare, MoreVertical, ArrowRightCircle, Copy, Link, Trash2 } from 'lucide-react'
import { AvatarGroup } from '../components/primitives/AvatarGroup'
import { TaskCardModal } from '../components/project/TaskCardModal'
import type { TaskDetail } from '../components/project/TaskCardModal'
import styles from './MyTasksPage.module.css'

type Priority   = 'urgent' | 'high' | 'medium' | 'low'
type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'

interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  status: TaskStatus
  topic: string
  dueDate?: string
  overdue?: boolean
  assignee: { name: string; color: string }
  comments?: number
}

interface TaskGroup {
  project: string
  color: string
  tasks: Task[]
}

const TASK_GROUPS: TaskGroup[] = [
  {
    project: 'Product Launch',
    color: 'var(--color-blue)',
    tasks: [
      { id: '1', title: 'Get legal sign-off on logo',   description: 'Legal needs to review the updated logo before we can ship. Minimum 5 business days — escalate if no response by May 24.', priority: 'urgent', status: 'in-progress', topic: 'Rebrand Launch',   dueDate: 'May 28', assignee: { name: 'Eugene Z.',  color: 'var(--color-blue)'   }, comments: 1 },
      { id: '2', title: 'Update brand guidelines doc',  description: 'Incorporate the new color palette, typography scale, and logo usage rules. Share with agency once done.', priority: 'high',   status: 'in-progress', topic: 'Rebrand Launch',   dueDate: 'Jun 1',  assignee: { name: 'Alex Kim',   color: 'var(--color-green)'  }, comments: 3 },
      { id: '3', title: 'Review API breaking changes',  priority: 'high',   status: 'todo',        topic: 'API v3 Migration', dueDate: 'May 30', assignee: { name: 'Eugene Z.',  color: 'var(--color-blue)'   }, comments: 2 },
      { id: '4', title: 'Brief external agency',        description: 'Walk the agency through brand positioning, target audience, and key messages. Share the updated guidelines doc beforehand.', priority: 'medium', status: 'todo',        topic: 'Rebrand Launch',                      assignee: { name: 'Max Rivera', color: 'var(--color-green)'  }, comments: 1 },
      { id: '5', title: 'Finalize Q3 budget',           priority: 'high',   status: 'done',        topic: 'Q3 Budget Review', dueDate: 'May 20', assignee: { name: 'Dana Song',  color: 'var(--color-purple)' }, comments: 3 },
    ],
  },
  {
    project: 'Platform v2',
    color: 'var(--color-purple)',
    tasks: [
      { id: '6',  title: 'Set up staging environment',         priority: 'high',   status: 'in-progress', topic: 'Infrastructure',  dueDate: 'May 29', assignee: { name: 'Jake Lee',   color: 'var(--color-orange)' } },
      { id: '7',  title: 'Write migration script for user data', description: 'Script should handle legacy user records, preserve created_at timestamps, and run idempotently. Test on staging before prod.', priority: 'high', status: 'todo',        topic: 'Data Migration',  dueDate: 'Jun 5',  assignee: { name: 'Eugene Z.',  color: 'var(--color-blue)'   }, comments: 4 },
      { id: '8',  title: 'Design new onboarding flow',         priority: 'medium', status: 'review',      topic: 'User Experience', dueDate: 'May 27', overdue: true, assignee: { name: 'Eugene Z.', color: 'var(--color-blue)' }, comments: 6 },
      { id: '9',  title: 'Audit current permissions model',    priority: 'low',    status: 'todo',        topic: 'Infrastructure',                     assignee: { name: 'Alex Kim',   color: 'var(--color-green)'  } },
    ],
  },
  {
    project: 'Growth Experiments',
    color: 'var(--color-orange)',
    tasks: [
      { id: '10', title: 'Analyze A/B test results for pricing page', description: 'Compare conversion rates between control and variant. Focus on plan selection drop-off and checkout completion.', priority: 'high',   status: 'in-progress', topic: 'Pricing Experiment', dueDate: 'May 31', assignee: { name: 'Max Rivera', color: 'var(--color-green)'  }, comments: 2 },
      { id: '11', title: 'Draft email campaign for re-engagement',    priority: 'medium', status: 'todo',        topic: 'Retention',          dueDate: 'Jun 3',  assignee: { name: 'Eugene Z.',  color: 'var(--color-blue)'   } },
      { id: '12', title: 'Competitive analysis doc',                  priority: 'medium', status: 'done',        topic: 'Market Research',                       assignee: { name: 'Max Rivera', color: 'var(--color-green)'  }, comments: 4 },
    ],
  },
]

const PRIORITY_COLOR: Record<Priority, string> = {
  urgent: 'var(--color-red)',
  high:   'var(--color-orange)',
  medium: 'var(--color-green)',
  low:    'var(--text-disabled)',
}

const PRIORITY_LABEL: Record<Priority, string> = {
  urgent: 'Urgent',
  high:   'High',
  medium: 'Medium',
  low:    'Low',
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

function TaskRow({ task, onOpen }: { task: Task; onOpen: (t: Task) => void }) {
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
    <div className={styles.taskRow} onClick={() => onOpen(task)}>
      <div className={styles.priorityCell}>
        <span className={styles.priorityDot} style={{ background: PRIORITY_COLOR[task.priority] }} />
        <span className={styles.priorityLabel} style={{ color: PRIORITY_COLOR[task.priority] }}>
          {PRIORITY_LABEL[task.priority]}
        </span>
      </div>

      <span className={styles.taskTitle}>{task.title}</span>

      <div className={styles.topicCell}>
        <span className={styles.topicTag}>{task.topic}</span>
      </div>

      <div className={styles.statusCell}>
        <span className={styles.statusBadge} style={{ color: STATUS_COLOR[task.status], borderColor: STATUS_COLOR[task.status] }}>
          {STATUS_LABEL[task.status]}
        </span>
      </div>

      <span className={`${styles.dueCell} ${task.overdue ? styles.dueCellOverdue : ''}`}>
        {task.dueDate && (
          <>
            <Calendar size={11} strokeWidth={1.5} />
            {task.dueDate}
          </>
        )}
      </span>

      <div className={styles.ownerCell}>
        <AvatarGroup avatars={[task.assignee]} size="sm" max={1} />
        {(task.comments ?? 0) > 0 && (
          <span className={styles.commentCount}>
            <MessageSquare size={11} strokeWidth={1.5} />
            {task.comments}
          </span>
        )}
      </div>

      {/* Kebab menu */}
      <div
        ref={menuRef}
        className={styles.menuWrap}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(v => !v)}
        >
          <MoreVertical size={14} strokeWidth={1.5} />
        </button>

        {menuOpen && (
          <div className={styles.dropdown}>
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
    </div>
  )
}

export function MyTasksPage() {
  const [modalTask, setModalTask] = useState<TaskDetail | null>(null)
  const totalTasks   = TASK_GROUPS.reduce((n, g) => n + g.tasks.length, 0)
  const projectCount = TASK_GROUPS.length

  function openTask(t: Task) {
    setModalTask({
      id:          t.id,
      title:       t.title,
      description: t.description ?? '',
      priority:    t.priority,
      status:      t.status,
      topic:       t.topic,
      assignee:    t.assignee,
      dueDate:     t.dueDate,
      createdBy:   t.assignee.name,
      createdAt:   'Apr 20',
    })
  }

  return (
    <div className={styles.page}>
      {modalTask && <TaskCardModal task={modalTask} onClose={() => setModalTask(null)} />}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>My Tasks</h1>
          <span className={styles.subtitle}>{totalTasks} tasks across {projectCount} projects</span>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <button className={styles.filterBtn}>All projects <ChevronDown size={10} strokeWidth={1.5} /></button>
          <button className={styles.filterBtn}>All priorities <ChevronDown size={10} strokeWidth={1.5} /></button>
          <button className={styles.filterBtn}>All statuses <ChevronDown size={10} strokeWidth={1.5} /></button>
          <button className={styles.filterBtn}>Due date <ChevronDown size={10} strokeWidth={1.5} /></button>
        </div>
        <button className={styles.groupByBtn}>Group by: Project <ChevronDown size={10} strokeWidth={1.5} /></button>
      </div>

      <div className={styles.content}>
        <div className={styles.colHeaders}>
          <span className={styles.colLabel}>Priority</span>
          <span className={styles.colLabel}>Task</span>
          <span className={styles.colLabel}>Topic</span>
          <span className={styles.colLabel}>Status</span>
          <span className={styles.colLabel}>Due</span>
          <span className={styles.colLabel}>Owner</span>
        </div>

        <div className={styles.groups}>
          {TASK_GROUPS.map(group => (
            <div key={group.project} className={styles.group}>
              <div className={styles.groupHeader}>
                <span className={styles.groupDot} style={{ background: group.color }} />
                <span className={styles.groupName}>{group.project}</span>
                <span className={styles.groupCount}>{group.tasks.length} tasks</span>
              </div>
              <div className={styles.taskList}>
                {group.tasks.map(t => (
                  <TaskRow key={t.id} task={t} onOpen={openTask} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
