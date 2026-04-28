import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Calendar, MessageSquare, Pin, ChevronDown } from 'lucide-react'
import { AvatarGroup } from '../primitives/AvatarGroup'
import { TaskCardModal, type TaskDetail } from './TaskCardModal'
import styles from './TaskBoard.module.css'

type Priority = 'urgent' | 'high' | 'medium' | 'low'
type ColStatus = 'todo' | 'in-progress' | 'review' | 'done'

interface Task {
  id: string
  title: string
  priority?: Priority
  topic: string
  blocked?: boolean
  assignee: { name: string; color?: string }
  dueDate?: string
  comments?: number
  pins?: number
  status: ColStatus
}

const TASKS: Task[] = [
  { id: '1',  title: 'Brief external agency',        priority: 'medium', topic: 'Rebrand Launch',      assignee: { name: 'Max Rivera',  color: 'var(--color-green)'  }, pins: 1,                          status: 'todo'        },
  { id: '2',  title: 'Create migration guide',        priority: 'high',   topic: 'API v3 Migration',    assignee: { name: 'Jake Lee',    color: 'var(--color-orange)' }, comments: 2, pins: 2, blocked: true, status: 'todo'     },
  { id: '3',  title: 'Design new email templates',    priority: 'low',    topic: 'Rebrand Launch',      assignee: { name: 'Alex Kim',    color: 'var(--color-blue)'   },                                    status: 'todo'        },
  { id: '4',  title: 'Update pricing page copy',                          topic: 'Growth Experiments',  assignee: { name: 'Alex Kim',    color: 'var(--color-blue)'   },                                    status: 'todo'        },
  { id: '5',  title: 'Update brand guidelines doc',   priority: 'high',   topic: 'Rebrand Launch',      assignee: { name: 'Alex Kim',    color: 'var(--color-blue)'   }, dueDate: 'Jun 1',  comments: 3, pins: 2, status: 'in-progress' },
  { id: '6',  title: 'Get legal sign-off on logo',    priority: 'urgent', topic: 'Rebrand Launch',      assignee: { name: 'Jake Lee',    color: 'var(--color-orange)' }, dueDate: 'May 28', comments: 1, pins: 1, blocked: true, status: 'in-progress' },
  { id: '7',  title: 'Audit current API endpoints',   priority: 'medium', topic: 'API v3 Migration',    assignee: { name: 'Dana Song',   color: 'var(--color-purple)' }, comments: 4, pins: 3,               status: 'in-progress' },
  { id: '8',  title: 'Color palette v2',              priority: 'high',   topic: 'Rebrand Launch',      assignee: { name: 'Alex Kim',    color: 'var(--color-blue)'   }, comments: 5, pins: 2,               status: 'review'      },
  { id: '9',  title: 'Onboarding flow mockups',       priority: 'medium', topic: 'Customer Onboarding', assignee: { name: 'Max Rivera',  color: 'var(--color-green)'  }, comments: 2, pins: 1,               status: 'review'      },
  { id: '10', title: 'Finalize Q3 budget',                                topic: 'Q3 Budget Review',    assignee: { name: 'Dana Song',   color: 'var(--color-purple)' }, comments: 3, pins: 2,               status: 'done'        },
  { id: '11', title: 'Competitive analysis doc',                          topic: 'Growth Experiments',  assignee: { name: 'Max Rivera',  color: 'var(--color-green)'  }, comments: 1, pins: 4,               status: 'done'        },
  { id: '12', title: 'Brand moodboard',                                   topic: 'Rebrand Launch',      assignee: { name: 'Alex Kim',    color: 'var(--color-blue)'   }, comments: 6, pins: 1,               status: 'done'        },
]

const TASK_DETAILS: Record<string, Partial<TaskDetail>> = {
  '6': {
    description: 'Coordinate with legal team to get approval on the updated logo. This is a hard dependency for the June 15 launch date.',
    createdBy: 'Anna Kim',
    createdAt: 'Apr 22',
    linkedNodes: [
      { id: 'n1', type: 'blocker', title: 'Legal review pending on new logo', source: 'Slack #rebrand · Apr 23' },
      { id: 'n2', type: 'date',    title: 'Launch date: June 15',             source: 'Product Sync Call · Apr 22' },
    ],
    comments: [
      { id: 'c1', author: { name: 'Jake Lee',  color: 'var(--color-orange)' }, timestamp: 'Apr 23, 14:00', text: "Sent the request to legal. They said minimum 5 business days. I'll follow up on Wednesday if no response.", likes: 2 },
      { id: 'c2', author: { name: 'Anna Kim',  color: 'var(--color-blue)'   }, timestamp: 'Apr 24, 09:30', text: "Can we escalate? If this takes 5 days, we're cutting it very close to June 15. Maybe Sarah can help.", likes: 1 },
      { id: 'c3', author: { name: 'Jake Lee',  color: 'var(--color-orange)' }, timestamp: 'Apr 25, 11:15', text: "Good news — Sarah got us bumped up in the queue. Should hear back by Monday.", likes: 3 },
    ],
  },
  '5': {
    description: 'Update the brand guidelines document with the new color palette, typography, and logo usage rules.',
    createdBy: 'Alex Kim',
    createdAt: 'Apr 20',
    linkedNodes: [
      { id: 'n1', type: 'fact', title: 'New brand guidelines approved by leadership', source: 'Google Doc · Apr 20' },
    ],
    comments: [
      { id: 'c1', author: { name: 'Dana Song', color: 'var(--color-purple)' }, timestamp: 'Apr 22, 10:00', text: 'First draft is ready for review. Added the new logo section and color tokens.', likes: 1 },
      { id: 'c2', author: { name: 'Alex Kim',  color: 'var(--color-blue)'   }, timestamp: 'Apr 22, 14:30', text: 'Looks good. Can you also add the updated type scale before we share with the agency?', likes: 0 },
      { id: 'c3', author: { name: 'Dana Song', color: 'var(--color-purple)' }, timestamp: 'Apr 23, 09:00', text: 'Done — type scale added. Ready to share.', likes: 2 },
    ],
  },
}

const COLUMNS: { key: ColStatus; label: string }[] = [
  { key: 'todo',        label: 'To Do'       },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'review',      label: 'Review'      },
  { key: 'done',        label: 'Done'        },
]

const PRIORITY_LABEL: Record<Priority, string> = {
  urgent: 'Urgent',
  high:   'High',
  medium: 'Medium',
  low:    'Low',
}

function toDetail(task: Task): TaskDetail {
  const extra = TASK_DETAILS[task.id] ?? {}
  return {
    ...task,
    description: extra.description ?? '',
    createdBy:   extra.createdBy   ?? 'Unknown',
    createdAt:   extra.createdAt   ?? '',
    linkedNodes: extra.linkedNodes ?? [],
    comments:    extra.comments    ?? [],
  }
}

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <div className={styles.card} onClick={onClick}>
      {task.priority && (
        <div className={styles.cardPriority}>
          <span className={`${styles.priorityDot} ${styles[`priority_${task.priority}`]}`} />
          <span className={`${styles.priorityLabel} ${styles[`priorityLabel_${task.priority}`]}`}>
            {PRIORITY_LABEL[task.priority]}
          </span>
        </div>
      )}
      <p className={styles.cardTitle}>{task.title}</p>
      <span className={styles.topicTag}>{task.topic}</span>
      {task.blocked && (
        <span className={styles.blockedBadge}>Blocked</span>
      )}
      <div className={styles.cardFooter}>
        <AvatarGroup avatars={[task.assignee]} size="sm" max={1} />
        <div className={styles.cardMeta}>
          {task.dueDate && (
            <span className={styles.metaItem}>
              <Calendar size={10} strokeWidth={1.5} />
              {task.dueDate}
            </span>
          )}
          {(task.comments ?? 0) > 0 && (
            <span className={styles.metaItem}>
              <MessageSquare size={10} strokeWidth={1.5} />
              {task.comments}
            </span>
          )}
          {(task.pins ?? 0) > 0 && (
            <span className={styles.metaItem}>
              <Pin size={10} strokeWidth={1.5} />
              {task.pins}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function TaskBoard() {
  const [selected, setSelected] = useState<TaskDetail | null>(null)

  return (
    <>
      <div className={styles.board}>
        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            <span className={styles.filterLabel}>Filter:</span>
            <button className={styles.filterBtn}>All topics <ChevronDown size={10} strokeWidth={1.5} /></button>
            <button className={styles.filterBtn}>Assignee <ChevronDown size={10} strokeWidth={1.5} /></button>
            <button className={styles.filterBtn}>Priority <ChevronDown size={10} strokeWidth={1.5} /></button>
          </div>
          <div className={styles.filterRight}>
            <span className={styles.filterLabel}>Group by:</span>
            <button className={styles.filterBtn}>Status <ChevronDown size={10} strokeWidth={1.5} /></button>
          </div>
        </div>

        <div className={styles.columns}>
          {COLUMNS.map(col => {
            const tasks = TASKS.filter(t => t.status === col.key)
            return (
              <div key={col.key} className={styles.column}>
                <div className={styles.colHeader}>
                  <span className={styles.colTitle}>{col.label}</span>
                  <span className={styles.colCount}>{tasks.length}</span>
                  <button className={styles.colAdd}>
                    <Plus size={13} strokeWidth={1.5} />
                  </button>
                </div>
                <div className={styles.cardList}>
                  {tasks.map(t => (
                    <TaskCard key={t.id} task={t} onClick={() => setSelected(toDetail(t))} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <TaskCardModal task={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
