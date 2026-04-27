import { useState } from 'react'
import { ChevronDown, Phone, MessageSquare, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SuggestedTopicCard } from './SuggestedTopicCard'
import { TriageNode } from '../nodes/TriageNode'
import styles from './SourceCard.module.css'

type SourceType = 'call' | 'slack' | 'doc'

const sourceIcons = { call: Phone, slack: MessageSquare, doc: FileText }
const sourceColors: Record<SourceType, string> = {
  call:  'var(--source-call-color)',
  slack: 'var(--source-slack-color)',
  doc:   'var(--source-doc-color)',
}

interface SuggestedTopic {
  name: string
}

interface NodeData {
  id: string
  type: 'date' | 'blocker' | 'budget' | 'fact'
  title: string
  description: string
  sourceQuote?: string
  sourceLabel?: string
  sourceLink?: string
  suggestedTopic?: string
  isAssigned?: boolean
  assignedTopic?: string
}

interface SourceCardProps {
  source: SourceType
  name: string
  timestamp: string
  itemCount: number
  aiSummary?: string
  suggestedTopics?: SuggestedTopic[]
  nodes?: NodeData[]
  defaultExpanded?: boolean
  availableTopics?: string[]
  onMarkReviewed?: () => void
}

export function SourceCard({
  source, name, timestamp, itemCount, aiSummary,
  suggestedTopics = [], nodes = [],
  defaultExpanded = false, availableTopics = [],
  onMarkReviewed,
}: SourceCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const Icon = sourceIcons[source]
  const color = sourceColors[source]

  return (
    <div className={styles.card}>
      {/* Source header */}
      <button className={styles.header} onClick={() => setExpanded(v => !v)}>
        <div className={styles.headerLeft}>
          <div className={styles.nameBlock}>
            <div className={styles.nameRow}>
              <Icon size={13} strokeWidth={1.5} style={{ color, flexShrink: 0 }} />
              <span className={styles.sourceName}>{name}</span>
            </div>
            <span className={styles.timestamp}>{timestamp}</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.itemCount}>{itemCount} items</span>
          <ChevronDown
            size={13}
            strokeWidth={1.5}
            className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
          />
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.body}>
              {aiSummary && (
                <div className={styles.summary}>
                  <span className={styles.summaryLabel}>Summary</span>
                  <p className={styles.summaryText}>{aiSummary}</p>
                </div>
              )}

              {suggestedTopics.length > 0 && (
                <div className={styles.subsection}>
                  <span className={styles.sectionLabel}>Suggested Topics</span>
                  <div className={styles.topicList}>
                    {suggestedTopics.map((t, i) => (
                      <SuggestedTopicCard key={i} topicName={t.name} />
                    ))}
                  </div>
                </div>
              )}

              {nodes.length > 0 && (
                <div className={styles.subsection}>
                  <span className={styles.sectionLabel}>Nodes</span>
                  <div className={styles.nodeList}>
                    {nodes.map(n => (
                      <TriageNode
                        key={n.id}
                        type={n.type}
                        title={n.title}
                        description={n.description}
                        sourceQuote={n.sourceQuote}
                        sourceLabel={n.sourceLabel}
                        sourceLink={n.sourceLink}
                        suggestedTopic={n.suggestedTopic}
                        isAssigned={n.isAssigned}
                        assignedTopic={n.assignedTopic}
                        topics={availableTopics}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button className={styles.reviewedBtn} onClick={onMarkReviewed}>
                Mark source as reviewed
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
