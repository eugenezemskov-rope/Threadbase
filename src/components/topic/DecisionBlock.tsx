import { useState, useRef, useEffect } from 'react'
import { Plus, ChevronUp, ChevronDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './DecisionBlock.module.css'

export interface Decision {
  text: string
  rationale?: string
  decidedAt: string
  decidedBy?: string
}

interface DecisionBlockProps {
  decision?: Decision
  onAddDecision: () => void
  onEditDecision?: () => void
  onRemoveDecision?: () => void
}

export function DecisionBlock({ decision, onAddDecision, onEditDecision, onRemoveDecision }: DecisionBlockProps) {
  const [rationaleOpen, setRationaleOpen] = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [confirmRemove, setConfirmRemove] = useState(false)
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

  if (!decision) {
    return (
      <button className={styles.empty} onClick={onAddDecision}>
        <Plus size={13} strokeWidth={1.5} />
        <span>Add decision</span>
      </button>
    )
  }

  return (
    <>
      <div className={styles.block}>
        <div className={styles.header}>
          <span className={styles.label}>Decision</span>
          <span className={styles.badge}>Decided</span>
          <div ref={menuRef} className={styles.menu}>
            <button className={styles.menuBtn} onClick={() => setMenuOpen(v => !v)}>
              <MoreHorizontal size={14} strokeWidth={1.5} />
            </button>
            {menuOpen && (
              <div className={styles.dropdown}>
                <button className={styles.dropdownItem} onClick={() => { setMenuOpen(false); onEditDecision?.() }}>
                  <Pencil size={13} strokeWidth={1.5} />
                  Edit decision
                </button>
                <div className={styles.dropdownSeparator} />
                <button className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`} onClick={() => { setMenuOpen(false); setConfirmRemove(true) }}>
                  <Trash2 size={13} strokeWidth={1.5} />
                  Remove decision
                </button>
              </div>
            )}
          </div>
        </div>

        <p className={styles.text}>{decision.text}</p>

        <AnimatePresence initial={false}>
          {rationaleOpen && decision.rationale && (
            <motion.div
              className={styles.rationaleBody}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.rationaleLabel}>Rationale</span>
              <p className={styles.rationaleText}>{decision.rationale}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.footer}>
          <span className={styles.date}>{decision.decidedAt}</span>
          {decision.rationale && (
            <button className={styles.rationaleBtn} onClick={() => setRationaleOpen(v => !v)}>
              {rationaleOpen
                ? <><span>Hide rationale</span><ChevronUp  size={11} strokeWidth={1.5} /></>
                : <><span>View rationale</span><ChevronDown size={11} strokeWidth={1.5} /></>}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {confirmRemove && (
          <motion.div
            className={styles.confirmBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className={styles.confirmDialog}
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 6 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <h4 className={styles.confirmTitle}>Remove this decision?</h4>
              <p className={styles.confirmText}>Tasks created from it will remain.</p>
              <div className={styles.confirmActions}>
                <button className="sg-btn sg-btn--secondary sg-btn--md" onClick={() => setConfirmRemove(false)}>
                  <span className="sg-btn-text">Cancel</span>
                </button>
                <button
                  className="sg-btn sg-btn--primary sg-btn--md"
                  style={{ background: 'var(--color-red)', borderColor: 'var(--color-red)' }}
                  onClick={() => { setConfirmRemove(false); onRemoveDecision?.() }}
                >
                  <span className="sg-btn-text">Remove</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
