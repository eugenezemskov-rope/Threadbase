import { ArrowRight } from 'lucide-react'
import styles from './DecisionBlock.module.css'

interface DecisionBlockProps {
  status: 'decided' | 'pending' | 'open'
  text: string
  decidedAt?: string
  onViewRationale?: () => void
}

const statusLabel: Record<DecisionBlockProps['status'], string> = {
  decided: 'Decided',
  pending: 'Pending',
  open:    'Open',
}

export function DecisionBlock({ status, text, decidedAt, onViewRationale }: DecisionBlockProps) {
  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <span className={styles.label}>Decision</span>
        <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
          {statusLabel[status]}
        </span>
      </div>
      <p className={styles.text}>{text}</p>
      {decidedAt && (
        <div className={styles.footer}>
          <span className={styles.date}>Decided {decidedAt}</span>
          {onViewRationale && (
            <button className={styles.rationaleBtn} onClick={onViewRationale}>
              View rationale
              <ArrowRight size={11} strokeWidth={1.5} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
