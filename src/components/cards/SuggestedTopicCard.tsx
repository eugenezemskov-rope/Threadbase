import { Sparkles, Check, X } from 'lucide-react'
import styles from './SuggestedTopicCard.module.css'

interface SuggestedTopicCardProps {
  topicName: string
  onAccept?: () => void
  onDismiss?: () => void
}

export function SuggestedTopicCard({ topicName, onAccept, onDismiss }: SuggestedTopicCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <span className={styles.aiTag}>
          <Sparkles size={10} strokeWidth={1.5} />
          AI pick
        </span>
        <span className={styles.name}>{topicName}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.acceptBtn} onClick={onAccept} title="Accept">
          <Check size={12} strokeWidth={2} />
          Accept
        </button>
        <button className={styles.dismissBtn} onClick={onDismiss} title="Dismiss">
          <X size={12} strokeWidth={2} />
          Dismiss
        </button>
      </div>
    </div>
  )
}
