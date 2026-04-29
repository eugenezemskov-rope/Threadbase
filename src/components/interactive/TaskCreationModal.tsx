import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import { AvatarGroup } from '../primitives/AvatarGroup'
import styles from './TaskCreationModal.module.css'

type Priority = 'urgent' | 'high' | 'medium' | 'low'

export interface NewActionItem {
  id: string
  title: string
  description?: string
  priority: Priority
  dueDate?: string
  assignee?: { name: string; color: string }
}

interface TaskCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onAddTask: (task: NewActionItem) => void
}

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'urgent', label: 'Urgent', color: 'var(--color-red)'      },
  { value: 'high',   label: 'High',   color: 'var(--color-orange)'   },
  { value: 'medium', label: 'Medium', color: 'var(--color-blue)'     },
  { value: 'low',    label: 'Low',    color: 'var(--text-disabled)'  },
]

const ASSIGNEES = [
  { name: 'Eugene Z.', color: 'var(--color-blue)'   },
  { name: 'Alex Kim',  color: 'var(--color-blue)'   },
  { name: 'Max Rivera',color: 'var(--color-green)'  },
  { name: 'Jake Lee',  color: 'var(--color-orange)' },
  { name: 'Dana Song', color: 'var(--color-purple)' },
]

function AutoTextarea({ value, onChange, placeholder, autoFocus }: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  autoFocus?: boolean
}) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])

  return (
    <textarea
      ref={ref}
      className={styles.textarea}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      rows={1}
    />
  )
}

export function TaskCreationModal({ isOpen, onClose, onAddTask }: TaskCreationModalProps) {
  const [title, setTitle]           = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority]     = useState<Priority>('medium')
  const [dueDate, setDueDate]       = useState('')
  const [assigneeIdx, setAssigneeIdx] = useState<number | null>(null)

  function handleAdd() {
    if (!title.trim()) return
    onAddTask({
      id:          String(Date.now()),
      title:       title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate:     dueDate.trim() || undefined,
      assignee:    assigneeIdx !== null ? ASSIGNEES[assigneeIdx] : undefined,
    })
    reset()
  }

  function reset() {
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setAssigneeIdx(null)
  }

  function handleClose() {
    reset()
    onClose()
  }

  const priorityColor = PRIORITY_OPTIONS.find(p => p.value === priority)?.color ?? 'var(--color-blue)'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div>
                <h3 className={styles.title}>New Task</h3>
              </div>
              <button className={styles.closeBtn} onClick={handleClose}>
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div className={styles.divider} />

            <div className={styles.body}>
              {/* Title */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Title</label>
                <AutoTextarea
                  value={title}
                  onChange={setTitle}
                  placeholder="Task title…"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>
                  Description
                  <span className={styles.optional}>Optional</span>
                </label>
                <AutoTextarea
                  value={description}
                  onChange={setDescription}
                  placeholder="Add a description…"
                />
              </div>

              {/* Priority + Due date */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Priority</label>
                  <div className={styles.selectWrap}>
                    <span className={styles.priorityDot} style={{ background: priorityColor }} />
                    <select
                      className={styles.select}
                      value={priority}
                      onChange={e => setPriority(e.target.value as Priority)}
                    >
                      {PRIORITY_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>
                    Due date
                    <span className={styles.optional}>Optional</span>
                  </label>
                  <input
                    className={styles.input}
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    placeholder="e.g. Jun 5"
                  />
                </div>
              </div>

              {/* Assignee */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>
                  Assignee
                  <span className={styles.optional}>Optional</span>
                </label>
                <div className={styles.selectWrap}>
                  {assigneeIdx !== null && (
                    <AvatarGroup avatars={[ASSIGNEES[assigneeIdx]]} size="sm" max={1} />
                  )}
                  <select
                    className={styles.select}
                    value={assigneeIdx ?? ''}
                    onChange={e => setAssigneeIdx(e.target.value === '' ? null : Number(e.target.value))}
                  >
                    <option value="">Unassigned</option>
                    {ASSIGNEES.map((a, i) => (
                      <option key={a.name} value={i}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Linked context */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>
                  Linked Context
                  <span className={styles.optional}>Optional</span>
                </label>
                <div className={styles.nodeChips}>
                  <button className={styles.linkMoreBtn}>
                    <Plus size={11} strokeWidth={1.5} />
                    Link context
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.footer}>
              <button className="sg-btn sg-btn--secondary sg-btn--lg" onClick={handleClose}>
                <span className="sg-btn-text">Cancel</span>
              </button>
              <button
                className="sg-btn sg-btn--primary sg-btn--lg"
                onClick={handleAdd}
                disabled={!title.trim()}
              >
                <span className="sg-btn-text">Add task</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
