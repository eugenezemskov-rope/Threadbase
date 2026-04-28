import { useState } from 'react'
import { ArrowRight, ThumbsUp, CornerUpLeft } from 'lucide-react'
import { TabBar } from '../primitives/TabBar'
import { AvatarGroup } from '../primitives/AvatarGroup'
import styles from './RightPanel.module.css'

interface Comment {
  id: string
  author: { name: string; color?: string }
  timestamp: string
  text: string
  likes?: number
  nodeRef?: string
  replies?: Comment[]
}

interface RightPanelProps {
  comments?: Comment[]
  taskCount?: number
}

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: '1',
    author: { name: 'Anna Kim', color: 'var(--color-blue)' },
    timestamp: 'Apr 22, 10:30',
    text: "I've drafted the new color palette — v2 is in the brand guidelines doc. Please review before EOD.",
    likes: 2,
    replies: [
      {
        id: '1a',
        author: { name: 'Max Rivera', color: 'var(--color-green)' },
        timestamp: 'Apr 22, 11:04',
        text: 'Looks great overall. One note — secondary blue might not pass AA contrast on light backgrounds.',
        likes: 1,
      },
      {
        id: '1b',
        author: { name: 'Anna Kim', color: 'var(--color-blue)' },
        timestamp: 'Apr 22, 11:22',
        text: "Good catch. I'll run it through the contrast checker and update before sending to the agency.",
        likes: 0,
      },
    ],
  },
  {
    id: '2',
    author: { name: 'Jake Lee', color: 'var(--color-orange)' },
    timestamp: 'Apr 23, 09:00',
    text: "Talked to legal — minimum 5 business days for the logo review. June 15 is at risk if we don't escalate today.",
    likes: 3,
    nodeRef: 'Legal review pending on new logo',
    replies: [
      {
        id: '2a',
        author: { name: 'Dana Song', color: 'var(--color-purple)' },
        timestamp: 'Apr 23, 09:45',
        text: "I've pinged Sarah directly — she has a contact in legal who can expedite. Waiting to hear back.",
        likes: 2,
      },
      {
        id: '2b',
        author: { name: 'Jake Lee', color: 'var(--color-orange)' },
        timestamp: 'Apr 23, 10:12',
        text: "Also flagged it in the #legal-requests channel. Let's see which path moves faster.",
        likes: 1,
      },
    ],
  },
  {
    id: '3',
    author: { name: 'Alex Kim', color: 'var(--color-blue)' },
    timestamp: 'Apr 23, 13:00',
    text: 'Design tokens are locked. Figma library has been updated — devs can start pulling from the new variables.',
    likes: 4,
  },
  {
    id: '4',
    author: { name: 'Max Rivera', color: 'var(--color-green)' },
    timestamp: 'Apr 23, 15:30',
    text: 'Quick question — are we standardizing the typography scale for email templates too, or is that a separate effort?',
    likes: 0,
    replies: [
      {
        id: '4a',
        author: { name: 'Dana Song', color: 'var(--color-purple)' },
        timestamp: 'Apr 23, 16:05',
        text: "Email templates are in scope but on a separate timeline — targeting end of May. Let's not block the main launch on it.",
        likes: 2,
      },
    ],
  },
  {
    id: '5',
    author: { name: 'Dana Song', color: 'var(--color-purple)' },
    timestamp: 'Apr 24, 09:15',
    text: 'Brand guidelines doc is published and shared with the agency. They confirmed receipt and will send first concepts by Apr 27.',
    likes: 3,
  },
  {
    id: '6',
    author: { name: 'Jake Lee', color: 'var(--color-orange)' },
    timestamp: 'Apr 24, 14:00',
    text: 'Update from legal: they need 3 more days on top of the original estimate. Review now wraps May 1 at earliest.',
    likes: 1,
    nodeRef: 'Legal review pending on new logo',
  },
]

function CommentItem({ c, isReply = false }: { c: Comment; isReply?: boolean }) {
  return (
    <div className={`${styles.comment} ${isReply ? styles.commentReply : ''}`}>
      <div className={styles.commentHeader}>
        <AvatarGroup avatars={[c.author]} size="sm" max={1} />
        <span className={styles.commentAuthor}>{c.author.name}</span>
        <span className={styles.commentTime}>{c.timestamp}</span>
      </div>
      {c.nodeRef && (
        <div className={styles.nodeRef}>
          <span className={styles.nodeRefDot} />
          <span className={styles.nodeRefText}>re: {c.nodeRef}</span>
        </div>
      )}
      <p className={styles.commentText}>{c.text}</p>
      <div className={styles.commentActions}>
        <button className={styles.actionBtn}>
          <CornerUpLeft size={11} strokeWidth={1.5} />
          Reply
        </button>
        <button className={styles.actionBtn}>
          <ThumbsUp size={11} strokeWidth={1.5} />
          {c.likes ?? 0}
        </button>
      </div>
      {c.replies && c.replies.length > 0 && (
        <div className={styles.replies}>
          {c.replies.map(r => (
            <CommentItem key={r.id} c={r} isReply />
          ))}
        </div>
      )}
    </div>
  )
}

function countComments(comments: Comment[]): number {
  return comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0)
}

export function RightPanel({
  comments = DEFAULT_COMMENTS,
  taskCount = 5,
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState('comments')
  const [draft, setDraft] = useState('')

  return (
    <aside className={styles.panel}>
      <div className={styles.tabs}>
        <TabBar
          tabs={[
            { key: 'comments', label: 'Comments', count: countComments(comments) },
            { key: 'tasks',    label: 'Tasks',    count: taskCount },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className={styles.body}>
        {activeTab === 'comments' && (
          <div className={styles.commentsSection}>
            <div className={styles.commentsList}>
              {comments.map(c => (
                <CommentItem key={c.id} c={c} />
              ))}
            </div>

            <div className={styles.commentInput}>
              <input
                className={styles.inputField}
                placeholder="Write a comment… @node to reference"
                value={draft}
                onChange={e => setDraft(e.target.value)}
              />
              {draft && (
                <button className={styles.sendBtn} onClick={() => setDraft('')}>Send</button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className={styles.emptyState}>
            <span className={styles.emptyText}>Task board coming soon</span>
          </div>
        )}

      </div>
    </aside>
  )
}
