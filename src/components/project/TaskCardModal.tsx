import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, CornerUpLeft, ThumbsUp, ArrowRight, Plus, CalendarDays, AlertCircle, DollarSign, Lightbulb, MoreVertical, ArrowRightCircle, Copy, Link, Trash2 } from 'lucide-react'
import { AvatarGroup } from '../primitives/AvatarGroup'
import styles from './TaskCardModal.module.css'

type Priority = 'urgent' | 'high' | 'medium' | 'low'
type ColStatus = 'todo' | 'in-progress' | 'review' | 'done'
type NodeType = 'blocker' | 'date' | 'budget' | 'fact'

interface LinkedNode {
  id: string
  type: NodeType
  title: string
  source: string
}

interface Comment {
  id: string
  author: { name: string; color?: string }
  timestamp: string
  text: string
  likes?: number
}

export interface TaskDetail {
  id: string
  title: string
  description: string
  priority?: Priority
  status: ColStatus
  topic: string
  assignee: { name: string; color?: string }
  dueDate?: string
  createdBy: string
  createdAt: string
  blocked?: boolean
  linkedNodes?: LinkedNode[]
  comments?: Comment[]
}

interface TaskCardModalProps {
  task: TaskDetail
  onClose: () => void
}

const STATUS_LABELS: Record<ColStatus, string> = {
  'todo':        'To Do',
  'in-progress': 'In Progress',
  'review':      'Review',
  'done':        'Done',
}

const STATUS_COLOR: Record<ColStatus, string> = {
  'todo':        'var(--text-tertiary)',
  'in-progress': 'var(--color-blue)',
  'review':      'var(--color-orange)',
  'done':        'var(--color-green)',
}

const PRIORITY_LABEL: Record<Priority, string> = {
  urgent: 'Urgent',
  high:   'High',
  medium: 'Medium',
  low:    'Low',
}

const NODE_ICON: Record<NodeType, React.ReactNode> = {
  blocker: <AlertCircle  size={12} strokeWidth={1.5} />,
  date:    <CalendarDays size={12} strokeWidth={1.5} />,
  budget:  <DollarSign  size={12} strokeWidth={1.5} />,
  fact:    <Lightbulb   size={12} strokeWidth={1.5} />,
}

export function TaskCardModal({ task, onClose }: TaskCardModalProps) {
  const [draft, setDraft] = useState('')
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
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>{task.title}</h2>
            <div className={styles.headerActions}>
            <div ref={menuRef} className={styles.headerMenu}>
              <button className={styles.headerMenuBtn} onClick={() => setMenuOpen(v => !v)}>
                <MoreVertical size={14} strokeWidth={1.5} />
              </button>
              {menuOpen && (
                <div className={styles.headerDropdown}>
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
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={14} strokeWidth={1.5} />
            </button>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Meta grid */}
          <div className={styles.metaGrid}>
            <span className={styles.metaLabel}>Status</span>
            <span className={styles.statusBadge} style={{ color: STATUS_COLOR[task.status], borderColor: STATUS_COLOR[task.status] }}>
              {STATUS_LABELS[task.status]}
            </span>

            <span className={styles.metaLabel}>Assignee</span>
            <div className={styles.metaAssignee}>
              <AvatarGroup avatars={[task.assignee]} size="sm" max={1} />
              <span className={styles.metaValue}>{task.assignee.name}</span>
            </div>

            <span className={styles.metaLabel}>Priority</span>
            {task.priority ? (
              <div className={styles.metaPriority}>
                <span className={`${styles.priorityDot} ${styles[`priority_${task.priority}`]}`} />
                <span className={`${styles.priorityText} ${styles[`priorityText_${task.priority}`]}`}>
                  {PRIORITY_LABEL[task.priority]}
                </span>
              </div>
            ) : <span className={styles.metaValue}>—</span>}

            <span className={styles.metaLabel}>Due date</span>
            <div className={styles.metaDue}>
              {task.dueDate
                ? <><Calendar size={11} strokeWidth={1.5} /><span className={styles.metaValue}>{task.dueDate}</span></>
                : <span className={styles.metaEmpty}>Not set</span>
              }
            </div>

            <span className={styles.metaLabel}>Topic</span>
            <button className={styles.topicTag}>
              {task.topic}
              <ArrowRight size={10} strokeWidth={1.5} />
            </button>

            <span className={styles.metaLabel}>Created by</span>
            <span className={styles.metaSecondary}>{task.createdBy} · {task.createdAt}</span>
          </div>

          {/* Linked context */}
          <div className={styles.divider} />
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Linked Context</span>
            <div className={styles.nodeChips}>
              {task.linkedNodes && task.linkedNodes.map(node => (
                <div key={node.id} className={styles.nodeChip}>
                  <span className={styles.nodeChipIcon}>{NODE_ICON[node.type]}</span>
                  <span className={styles.nodeChipTitle}>{node.title}</span>
                  <button className={styles.nodeChipRemove}>
                    <X size={10} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
              <button className={styles.linkMoreBtn}>
                <Plus size={11} strokeWidth={1.5} />
                Link context
              </button>
            </div>
          </div>

          {/* Description */}
          <div className={styles.divider} />
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Description</span>
            </div>
            {task.description
              ? <p className={styles.description}>{task.description}</p>
              : <p className={styles.descriptionEmpty}>Add a description…</p>
            }
          </div>

          {/* Comments */}
          <div className={styles.divider} />
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Comments</span>
              {task.comments && task.comments.length > 0 && (
                <span className={styles.commentCount}>{task.comments.length}</span>
              )}
            </div>

            {task.comments && task.comments.length > 0 && (
              <div className={styles.commentList}>
                {task.comments.map((c, i) => (
                  <div key={c.id}>
                    {i > 0 && <div className={styles.commentDivider} />}
                    <div className={styles.comment}>
                      <AvatarGroup avatars={[c.author]} size="sm" max={1} />
                      <div className={styles.commentBody}>
                        <div className={styles.commentHeader}>
                          <span className={styles.commentAuthor}>{c.author.name}</span>
                          <span className={styles.commentTime}>{c.timestamp}</span>
                        </div>
                        <p className={styles.commentText}>{c.text}</p>
                        <div className={styles.commentActions}>
                          <button className={styles.actionBtn}>
                            <CornerUpLeft size={10} strokeWidth={1.5} />
                            Reply
                          </button>
                          <button className={styles.actionBtn}>
                            <ThumbsUp size={10} strokeWidth={1.5} />
                            {c.likes ?? 0}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.commentInput}>
              <input
                className={styles.inputField}
                placeholder="Write a comment…"
                value={draft}
                onChange={e => setDraft(e.target.value)}
              />
              {draft && (
                <button className={styles.sendBtn} onClick={() => setDraft('')}>Send</button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
