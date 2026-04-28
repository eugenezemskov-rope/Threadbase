import { useState } from 'react'
import { ChevronDown, Star, Link } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AvatarGroup } from '../primitives/AvatarGroup'
import styles from './ContextNode.module.css'

type NodeType = 'date' | 'blocker' | 'budget' | 'fact'

interface ContextNodeProps {
  type: NodeType
  title: string
  description?: string
  sourceLabel?: string
  sourceQuote?: string
  sourceLink?: string
  createdBy?: { name: string; color?: string }
  myNote?: string
  starred?: boolean
  defaultExpanded?: boolean
}

export function ContextNode({
  type, title, description, sourceLabel, sourceQuote, sourceLink,
  createdBy, myNote,
  starred = false, defaultExpanded = false,
}: ContextNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [isStarred, setIsStarred] = useState(starred)

  const color = `var(--node-${type}-color)`

  return (
    <div className={`${styles.node} ${expanded ? styles.nodeExpanded : ''}`}>
      <div className={styles.accent} style={{ background: color }} />

      <div className={styles.body}>
        <button className={styles.headerRow} onClick={() => setExpanded(v => !v)}>
          <button
            className={`${styles.starBtn} ${isStarred ? styles.starBtnActive : ''}`}
            onClick={e => { e.stopPropagation(); setIsStarred(v => !v) }}
          >
            <Star size={12} strokeWidth={1.5} fill={isStarred ? 'currentColor' : 'none'} />
          </button>
          <span className={styles.title}>{title}</span>
          <ChevronDown
            size={13}
            strokeWidth={1.5}
            className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className={styles.expandedBody}>
                {description && (
                  <p className={styles.description}>{description}</p>
                )}

                {sourceQuote && (
                  <div className={styles.quoteBlock} style={{ borderColor: color }}>
                    <p className={styles.quoteText}>"{sourceQuote}"</p>
                  </div>
                )}

                {myNote && (
                  <div className={styles.noteBlock}>
                    <span className={styles.noteLabel}>My Note</span>
                    <p className={styles.noteText}>{myNote}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {(createdBy || sourceLabel) && (
          <div className={`${styles.creatorLine} ${expanded ? styles.creatorLineExpanded : ''}`}>
            {createdBy && (
              <>
                <AvatarGroup avatars={[createdBy]} size="sm" max={1} />
                <span className={styles.creatorName} style={{ color: createdBy.color }}>{createdBy.name}</span>
              </>
            )}
            {sourceLabel && (
              <>
                {createdBy && <span className={styles.sourceSep}>·</span>}
                <span className={styles.sourceMeta}>{sourceLabel}</span>
              </>
            )}
            {sourceLink && (
              <>
                <span className={styles.sourceSep}>·</span>
                <a className={styles.sourceLink} href="#">
                  <Link size={10} strokeWidth={1.5} />
                  {sourceLink}
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
