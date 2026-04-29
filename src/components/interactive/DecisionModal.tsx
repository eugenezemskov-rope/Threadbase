import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Calendar } from 'lucide-react'
import { AvatarGroup } from '../primitives/AvatarGroup'
import { TaskCreationModal } from './TaskCreationModal'
import type { NewActionItem } from './TaskCreationModal'
import type { Decision } from '../topic/DecisionBlock'
import styles from './DecisionModal.module.css'

type Priority = 'urgent' | 'high' | 'medium' | 'low'
type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'

interface ExistingTask {
  id: string
  title: string
  priority: Priority
  status: TaskStatus
  assignee: { name: string; color?: string }
}

interface DecisionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (decision: Decision, actionItems: NewActionItem[]) => void
  topicName?: string
  existingTasks?: ExistingTask[]
  initialDecision?: Decision
}

const PRIORITY_COLOR: Record<Priority, string> = {
  urgent: 'var(--color-red)',
  high:   'var(--color-orange)',
  medium: 'var(--color-blue)',
  low:    'var(--text-disabled)',
}

const STATUS_COLOR: Record<TaskStatus, string> = {
  'todo':        'var(--text-tertiary)',
  'in-progress': 'var(--color-blue)',
  'review':      'var(--color-orange)',
  'done':        'var(--color-green)',
}

const STATUS_LABEL: Record<TaskStatus, string> = {
  'todo':        'To Do',
  'in-progress': 'In Progress',
  'review':      'Review',
  'done':        'Done',
}

export function DecisionModal({
  isOpen,
  onClose,
  onConfirm,
  topicName,
  existingTasks = [],
  initialDecision,
}: DecisionModalProps) {
  const isEdit = !!initialDecision

  const [text, setText]               = useState(initialDecision?.text ?? '')
  const [rationale, setRationale]     = useState(initialDecision?.rationale ?? '')
  const [actionItems, setActionItems] = useState<NewActionItem[]>([])
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [discardOpen, setDiscardOpen]     = useState(false)

  const isDirty = text.trim() !== (initialDecision?.text ?? '') ||
                  rationale.trim() !== (initialDecision?.rationale ?? '') ||
                  actionItems.length > 0

  function handleClose() {
    if (isDirty) { setDiscardOpen(true) } else { doClose() }
  }

  function doClose() {
    setText(initialDecision?.text ?? '')
    setRationale(initialDecision?.rationale ?? '')
    setActionItems([])
    setDiscardOpen(false)
    onClose()
  }

  function handleConfirm() {
    if (!text.trim()) return
    onConfirm(
      {
        text:      text.trim(),
        rationale: rationale.trim() || undefined,
        decidedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      },
      actionItems,
    )
    setText('')
    setRationale('')
    setActionItems([])
  }

  function handleAddTask(task: NewActionItem) {
    setActionItems(prev => [...prev, task])
    setTaskModalOpen(false)
  }

  function removeActionItem(id: string) {
    setActionItems(prev => prev.filter(t => t.id !== id))
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            onClick={handleClose}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.headerText}>
                  <h3 className={styles.title}>{isEdit ? 'Edit Decision' : 'Add Decision'}</h3>
                  {topicName && <p className={styles.subtitle}>{topicName}</p>}
                </div>
                <button className={styles.closeBtn} onClick={handleClose}>
                  <X size={14} strokeWidth={1.5} />
                </button>
              </div>

              <div className={styles.divider} />

              <div className={styles.body}>
                {/* Decision text */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Decision</label>
                  <textarea
                    className={styles.textarea}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="What was decided?"
                    rows={2}
                    autoFocus
                  />
                </div>

                {/* Rationale */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>
                    Rationale
                    <span className={styles.optional}>Optional</span>
                  </label>
                  <textarea
                    className={styles.textarea}
                    value={rationale}
                    onChange={e => setRationale(e.target.value)}
                    placeholder="Why was this decision made?"
                    rows={2}
                  />
                </div>

                <div className={styles.divider} />

                {/* Existing tasks */}
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionLabel}>Topic tasks</span>
                    <span className={styles.sectionCount}>{existingTasks.length} tasks in this topic</span>
                  </div>
                  {existingTasks.length === 0 ? (
                    <p className={styles.emptyItems}>No tasks in this topic yet</p>
                  ) : (
                    <div className={styles.taskList}>
                      {existingTasks.map(t => (
                        <div key={t.id} className={styles.taskRow}>
                          <span className={styles.taskDot} style={{ background: STATUS_COLOR[t.status] }} />
                          <span className={`${styles.taskTitle} ${t.status === 'done' ? styles.taskTitleDone : ''}`}>
                            {t.title}
                          </span>
                          <span className={styles.taskStatus} style={{ color: STATUS_COLOR[t.status], borderColor: STATUS_COLOR[t.status] }}>
                            {STATUS_LABEL[t.status]}
                          </span>
                          <AvatarGroup avatars={[t.assignee]} size="sm" max={1} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.divider} />

                {/* Action items */}
                <div className={styles.section}>
                  <span className={styles.sectionLabel}>New action items</span>

                  {actionItems.length > 0 && (
                    <div className={styles.taskList}>
                      {actionItems.map(t => (
                        <div key={t.id} className={styles.taskRow}>
                          <span className={styles.taskDot} style={{ background: PRIORITY_COLOR[t.priority] }} />
                          <span className={styles.taskTitle}>{t.title}</span>
                          {t.assignee && <AvatarGroup avatars={[t.assignee]} size="sm" max={1} />}
                          {t.dueDate && (
                            <span className={styles.taskDue}>
                              <Calendar size={10} strokeWidth={1.5} />
                              {t.dueDate}
                            </span>
                          )}
                          <button className={styles.removeItemBtn} onClick={() => removeActionItem(t.id)}>
                            <X size={11} strokeWidth={1.5} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button className={styles.addItemBtn} onClick={() => setTaskModalOpen(true)}>
                    <Plus size={12} strokeWidth={1.5} />
                    Add action item
                  </button>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.footer}>
                <button className="sg-btn sg-btn--secondary sg-btn--lg" onClick={handleClose}>
                  <span className="sg-btn-text">Cancel</span>
                </button>
                <div className={styles.footerRight}>
                  {actionItems.length > 0 && (
                    <span className={styles.footerHint}>
                      {actionItems.length} new task{actionItems.length !== 1 ? 's' : ''} will be created
                    </span>
                  )}
                  <button
                    className="sg-btn sg-btn--primary sg-btn--lg"
                    onClick={handleConfirm}
                    disabled={!text.trim()}
                  >
                    <span className="sg-btn-text">{isEdit ? 'Save changes' : 'Confirm decision'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discard confirmation */}
      <AnimatePresence>
        {discardOpen && (
          <motion.div
            className={styles.discardBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className={styles.discardDialog}
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 6 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className={styles.discardTitle}>Discard changes?</h4>
              <p className={styles.discardText}>Your decision draft will not be saved.</p>
              <div className={styles.discardActions}>
                <button className="sg-btn sg-btn--secondary sg-btn--md" onClick={() => setDiscardOpen(false)}>
                  <span className="sg-btn-text">Keep editing</span>
                </button>
                <button
                  className="sg-btn sg-btn--primary sg-btn--md"
                  style={{ background: 'var(--color-red)', borderColor: 'var(--color-red)' }}
                  onClick={doClose}
                >
                  <span className="sg-btn-text">Discard</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TaskCreationModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </>
  )
}
