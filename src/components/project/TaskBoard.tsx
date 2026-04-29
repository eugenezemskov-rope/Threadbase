import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Calendar, ChevronDown, MoreHorizontal, ArrowRightCircle, Copy, Link, Trash2 } from 'lucide-react'
import { AvatarGroup } from '../primitives/AvatarGroup'
import { TaskCardModal, type TaskDetail } from './TaskCardModal'
import { ALL_TASKS } from '../../data/projectData'
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
  status: ColStatus
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
  return {
    ...task,
    description: '',
    createdBy:   task.assignee.name,
    createdAt:   '',
    linkedNodes: [],
    comments:    [],
  }
}

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
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
    <div className={styles.card} onClick={onClick}>
      {task.priority && (
        <div className={styles.cardPriority}>
          <span className={`${styles.priorityDot} ${styles[`priority_${task.priority}`]}`} />
          <span className={`${styles.priorityLabel} ${styles[`priorityLabel_${task.priority}`]}`}>
            {PRIORITY_LABEL[task.priority]}
          </span>
        </div>
      )}

      <div ref={menuRef} className={styles.cardMenu} onClick={e => e.stopPropagation()}>
        <button className={styles.cardMenuBtn} onClick={() => setMenuOpen(v => !v)}>
          <MoreHorizontal size={13} strokeWidth={1.5} />
        </button>
        {menuOpen && (
          <div className={styles.cardDropdown}>
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

      <p className={styles.cardTitle}>{task.title}</p>
      <span className={styles.topicTag}>{task.topic}</span>
      <div className={styles.cardFooter}>
        <AvatarGroup avatars={[task.assignee]} size="sm" max={1} />
        <div className={styles.cardMeta}>
          {task.dueDate && (
            <span className={styles.metaItem}>
              <Calendar size={10} strokeWidth={1.5} />
              {task.dueDate}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

interface TaskBoardProps {
  activeProjectId?: string | null
}

export function TaskBoard({ activeProjectId }: TaskBoardProps) {
  const [selected, setSelected] = useState<TaskDetail | null>(null)

  const TASKS: Task[] = ALL_TASKS
    .filter(t => !activeProjectId || t.projectId === activeProjectId)
    .map(t => ({
      id:       t.id,
      title:    t.title,
      priority: t.priority,
      topic:    t.topicTitle,
      blocked:  t.blocked,
      assignee: t.assignee,
      dueDate:  t.dueDate,
      comments: t.comments,
      status:   t.status,
    }))

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
