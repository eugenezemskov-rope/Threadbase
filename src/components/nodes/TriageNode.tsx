import { useState } from 'react'
import { ChevronDown, Link, ArrowRight } from 'lucide-react'
import { Calendar, Ban, Wallet, Pin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SelectDropdown } from '../primitives/SelectDropdown'
import type { SelectOption } from '../primitives/SelectDropdown'
import styles from './TriageNode.module.css'

type NodeType = 'date' | 'blocker' | 'budget' | 'fact'

const typeIcons = { date: Calendar, blocker: Ban, budget: Wallet, fact: Pin }

const TOPIC_PALETTE = [
  'var(--color-blue)',
  'var(--color-green)',
  'var(--color-orange)',
  'var(--color-purple)',
  'var(--color-teal)',
  'var(--color-red)',
]

function topicColor(name: string): string {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff
  return TOPIC_PALETTE[h % TOPIC_PALETTE.length]
}

interface TriageNodeProps {
  type: NodeType
  title: string
  description: string
  sourceQuote?: string
  sourceLabel?: string
  sourceLink?: string
  suggestedTopic?: string
  assignedTopic?: string
  isAssigned?: boolean
  starred?: boolean
  topics?: string[]
  onAssign?: (topic: string) => void
  onDismiss?: () => void
}

export function TriageNode({
  type, title, description, sourceQuote, sourceLabel, sourceLink,
  suggestedTopic, assignedTopic, isAssigned = false,
  topics = [], onAssign,
}: TriageNodeProps) {
  const [expanded, setExpanded] = useState(false)
  const [assignedTo, setAssignedTo] = useState(
    isAssigned ? (assignedTopic ?? suggestedTopic ?? '') : ''
  )

  const Icon = typeIcons[type]

  const topicOptions: SelectOption[] = [
    ...(suggestedTopic ? [{ value: suggestedTopic, label: suggestedTopic, isAI: true }] : []),
    ...topics
      .filter(t => t !== suggestedTopic)
      .map(t => ({ value: t, label: t, color: topicColor(t) })),
  ]

  function handleAssign(topic: string) {
    setAssignedTo(topic)
    onAssign?.(topic)
  }

  return (
    <div className={`${styles.node} ${expanded ? styles.nodeExpanded : ''}`}>
      <div className={styles.accent} style={{ background: `var(--node-${type}-color)` }} />

      <div className={`${styles.body} ${!expanded && assignedTo ? styles.bodyWithBadge : ''}`}>
        {/* Header row */}
        <button className={styles.headerRow} onClick={() => setExpanded(v => !v)}>
          <div className={styles.titleRow}>
            <Icon size={12} strokeWidth={1.5} style={{ color: `var(--node-${type}-color)`, flexShrink: 0 }} />
            <span className={styles.title}>{title}</span>
          </div>
          <ChevronDown
            size={13}
            strokeWidth={1.5}
            className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
          />
        </button>


        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className={styles.expandedBody}>
                <p className={styles.description}>{description}</p>

                {sourceQuote && (
                  <div className={styles.quoteBlock} style={{ borderColor: `var(--node-${type}-color)` }}>
                    <p className={styles.quoteText}>"{sourceQuote}"</p>
                    {sourceLabel && (
                      <div className={styles.quoteMeta}>
                        <span className={styles.sourceLabel}>{sourceLabel}</span>
                        {sourceLink && (
                          <a className={styles.sourceLink} href="#">
                            <Link size={10} strokeWidth={1.5} />
                            {sourceLink}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}

<div className={styles.assignRow}>
                  <span className={styles.assignLabel}>Assign to topic:</span>
                  <SelectDropdown
                    options={topicOptions}
                    value={assignedTo || undefined}
                    onChange={handleAssign}
                    placeholder="Choose a topic…"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed assigned badge */}
        {!expanded && assignedTo && (
          <div className={styles.assignedBadge}>
            <ArrowRight size={10} strokeWidth={2} />
            <span>{assignedTo}</span>
          </div>
        )}
      </div>
    </div>
  )
}
