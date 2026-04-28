import { Plus, ArrowDownUp, ArrowRight, Link2 } from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { HeaderBar } from '../components/layout/HeaderBar'
import { DecisionBlock } from '../components/topic/DecisionBlock'
import { ContextNode } from '../components/topic/ContextNode'
import { RightPanel } from '../components/topic/RightPanel'
import styles from './TopicPage.module.css'

const TOPICS_IN_PROJECT = [
  { id: '1', name: 'Rebrand Launch',   active: true },
  { id: '2', name: 'API v3 Migration' },
  { id: '3', name: 'Q3 Budget Review' },
]

const MEMBERS = [
  { name: 'Alex Kim',    color: 'var(--color-blue)' },
  { name: 'Max Rivera',  color: 'var(--color-green)' },
  { name: 'Jake Lee',    color: 'var(--color-orange)' },
  { name: 'Dana Song',   color: 'var(--color-purple)' },
]

interface TopicPageProps {
  onBack?: () => void
  onHome?: () => void
}

export function TopicPage({ onBack, onHome }: TopicPageProps) {

  return (
    <div className={styles.page}>
      <Sidebar
        mode="topic"
        topics={TOPICS_IN_PROJECT}
        onBackClick={onBack}
        onHomeClick={onHome}
      />

      <div className={styles.main}>
        <HeaderBar
          breadcrumb={[
            { label: 'Product Launch', onClick: onBack },
            { label: 'Rebrand Launch' },
          ]}
          onHomeClick={onHome}
          members={MEMBERS}
          memberCount={12}
        />

        <div className={styles.content}>
          {/* Topic header */}
          <div className={styles.topicHeader}>
            <div className={styles.statusRow}>
              <span className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span className={styles.statusBadgeText}>Active</span>
              </span>
              <span className={styles.topicMeta}>
                Created by
                <span className={styles.topicMetaName} style={{ color: 'var(--color-blue)' }}>Alex Kim</span>
                · Apr 18
              </span>
            </div>
            <h1 className={styles.topicTitle}>Rebrand Launch</h1>
            <p className={styles.topicDesc}>
              Complete visual rebrand across all customer-facing touchpoints.
              New brand guidelines, design system update, and rollout plan.
            </p>

            <div className={styles.linkedTopics}>
              <span className={styles.linkedLabel}>
                <Link2 size={11} strokeWidth={1.5} />
                Linked
              </span>
              {[
                { id: '1', title: 'Q3 Budget Review',    relation: 'Shared decision' },
                { id: '2', title: 'Design System Update', relation: 'Related context' },
              ].map(t => (
                <button key={t.id} className={styles.linkedChip}>
                  {t.title}
                  <span className={styles.linkedRelation}>{t.relation}</span>
                  <ArrowRight size={10} strokeWidth={1.5} />
                </button>
              ))}
              <button className={styles.linkedAdd}>+ Link</button>
            </div>
          </div>

          {/* Decision block */}
          <DecisionBlock
            status="decided"
            text="Go with Option A — evolutionary rebrand, preserving existing brand equity"
            decidedAt="Apr 20"
            onViewRationale={() => {}}
          />

          {/* Context nodes */}
          <div className={styles.contextSection}>
            <div className={styles.contextHeader}>
              <span className={styles.contextLabel}>Context</span>
              <div className={styles.contextActions}>
                <button className="sg-btn sg-btn--secondary sg-btn--sm">
                  <Plus size={11} strokeWidth={1.5} />
                  <span className="sg-btn-text">Add node</span>
                </button>
                <button className={styles.sortBtn}>
                  <ArrowDownUp size={11} strokeWidth={1.5} />
                  <span>Sort: Starred</span>
                </button>
              </div>
            </div>

            <div className={styles.nodeList}>
              <ContextNode
                type="date"
                title="Launch date: June 15"
                description="Confirmed with engineering that June 15 works if legal comes through."
                sourceLabel="Product Sync Call · Apr 22"
                sourceLink="Open summary"
                createdBy={{ name: 'Alex Kim', color: 'var(--color-blue)' }}
                starred
              />
              <ContextNode
                type="blocker"
                title="Legal review pending on new logo"
                description="Legal team needs 5 business days to review the updated logo. This is a hard dependency for the June 15 launch."
                sourceQuote="We can't ship the new logo without legal sign-off. They said minimum 5 business days, and they haven't started yet. We need to escalate or the date slips."
                sourceLabel="Slack #rebrand · Apr 23, 14:32"
                sourceLink="Open in Slack"
                createdBy={{ name: 'Jake Lee',  color: 'var(--color-orange)' }}
                myNote="Need to ping Sarah about expediting this — she knows someone in legal"
                starred
              />
              <ContextNode
                type="budget"
                title="Budget approved: $45k for external agency"
                description="Finance confirmed budget allocation for external design agency."
                sourceLabel="Google Doc — Budget Q3 · Apr 21"
                sourceLink="Open doc"
                createdBy={{ name: 'Dana Song', color: 'var(--color-purple)' }}
              />
              <ContextNode
                type="fact"
                title="Competitor X rebranded — 20% traffic lift"
                description="Market data suggests rebrand can drive measurable traffic growth."
                sourceLabel="Research doc · Apr 19"
                sourceLink="Open doc"
                createdBy={{ name: 'Max Rivera', color: 'var(--color-green)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <RightPanel taskCount={5} />
    </div>
  )
}
