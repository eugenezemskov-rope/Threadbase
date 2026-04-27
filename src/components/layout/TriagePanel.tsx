import { useState } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { TabBar } from '../primitives/TabBar'
import { SourceCard } from '../cards/SourceCard'
import styles from './TriagePanel.module.css'

const TOPICS = ['Rebrand Launch', 'API v3 Migration', 'Q3 Budget Review', 'Onboarding Revamp']

interface TriagePanelProps {
  onClose: () => void
  newCount?: number
}

export function TriagePanel({ onClose, newCount = 5 }: TriagePanelProps) {
  const [activeTab, setActiveTab] = useState('new')

  return (
    <motion.div
      className={styles.panelOuter}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <aside className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.title}>Context Triage</span>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.tabs}>
          <TabBar
            tabs={[
              { key: 'new', label: 'New', count: newCount },
              { key: 'archived', label: 'Archived' },
            ]}
            active={activeTab}
            onChange={setActiveTab}
          />
        </div>

        <div className={styles.body}>
          {activeTab === 'new' && (
            <>
              <SourceCard
                source="call"
                name="Product Sync Call"
                timestamp="Apr 15 · 14:32"
                itemCount={3}
                defaultExpanded
                aiSummary="Discussed launch timeline, legal blockers, agency budget. June 15 is the target date pending legal sign-off."
                suggestedTopics={[{ name: 'Launch Timeline Planning' }]}
                nodes={[
                  {
                    id: '1',
                    type: 'date',
                    title: 'Launch date: June 15',
                    description: 'Confirmed with engineering that June 15 works if legal sign-off comes by May 28.',
                    sourceQuote: 'Sarah confirmed June 15 is doable from eng side. Hard dep on legal — need sign-off by end of May at the latest.',
                    sourceLabel: 'Product Sync Call · 14:32',
                    sourceLink: 'Open recording',
                    suggestedTopic: 'Rebrand Launch',
                  },
                  {
                    id: '2',
                    type: 'blocker',
                    title: 'Legal review pending on logo',
                    description: 'Legal needs 5 business days for new logo review.',
                    isAssigned: true,
                    assignedTopic: 'Rebrand Launch',
                  },
                  {
                    id: '3',
                    type: 'fact',
                    title: 'Color palette v2 finalized',
                    description: 'Team agreed on updated color palette during sync.',
                  },
                ]}
                availableTopics={TOPICS}
              />
              <SourceCard
                source="slack"
                name="Slack #general"
                timestamp="Apr 16"
                itemCount={2}
                aiSummary="Team flagged onboarding drop-off spike and confirmed mobile beta pushed to Aug 1 due to TestFlight delays."
                suggestedTopics={[{ name: 'Onboarding Revamp' }]}
                nodes={[
                  {
                    id: 's1',
                    type: 'blocker',
                    title: 'Onboarding drop-off spike — week 2',
                    description: 'Analytics show 34% drop-off at step 3 of onboarding. Needs investigation before beta.',
                    sourceQuote: "Step 3 drop-off jumped to 34% this week, something broke or the copy is confusing.",
                    sourceLabel: 'Slack #general · Apr 16',
                    sourceLink: 'Open thread',
                    suggestedTopic: 'Onboarding Revamp',
                  },
                  {
                    id: 's2',
                    type: 'date',
                    title: 'Mobile beta pushed to Aug 1',
                    description: 'TestFlight review taking longer than expected. New target date is August 1.',
                    sourceQuote: "Apple pushed back TestFlight approval, we're looking at Aug 1 at the earliest.",
                    sourceLabel: 'Slack #general · Apr 16',
                    sourceLink: 'Open thread',
                    suggestedTopic: 'Mobile App Beta',
                  },
                ]}
                availableTopics={TOPICS}
              />
              <SourceCard
                source="doc"
                name="Google Doc — Q3 Spec"
                timestamp="Apr 14"
                itemCount={1}
                aiSummary="Q3 spec defines $120k total budget across three workstreams. API migration takes the largest allocation at $55k."
                nodes={[
                  {
                    id: 'd1',
                    type: 'budget',
                    title: 'Q3 total budget: $120k across 3 workstreams',
                    description: 'API Migration: $55k · Onboarding Revamp: $40k · Mobile Beta: $25k. Approved by finance on Apr 12.',
                    sourceQuote: "Budget breakdown — API migration $55k, onboarding $40k, mobile $25k. Finance signed off April 12th.",
                    sourceLabel: 'Google Doc — Q3 Spec · p.4',
                    sourceLink: 'Open doc',
                    suggestedTopic: 'Q3 Budget Review',
                  },
                ]}
                availableTopics={TOPICS}
              />
            </>
          )}
          {activeTab === 'archived' && (
            <>
              <SourceCard
                source="call"
                name="Design Review Call"
                timestamp="Apr 10 · 11:00"
                itemCount={2}
                aiSummary="Reviewed v1 color palette and typography. Both approved — no further changes needed."
                nodes={[
                  {
                    id: 'a1',
                    type: 'fact',
                    title: 'Color palette v1 approved',
                    description: 'All stakeholders signed off on v1 palette. Archived after v2 superseded it.',
                    isAssigned: true,
                    assignedTopic: 'Rebrand Launch',
                  },
                  {
                    id: 'a2',
                    type: 'fact',
                    title: 'Typography locked: Neue Machina + Inter',
                    description: 'Font pairing finalized in design review. No changes after this session.',
                    isAssigned: true,
                    assignedTopic: 'Rebrand Launch',
                  },
                ]}
                availableTopics={TOPICS}
              />
              <SourceCard
                source="doc"
                name="Notion — Project Brief v1"
                timestamp="Apr 8"
                itemCount={1}
                aiSummary="Original project brief. Superseded by v2 after scope changes in April planning session."
                nodes={[
                  {
                    id: 'a3',
                    type: 'date',
                    title: 'Original launch target: May 30',
                    description: 'Initial launch date from brief v1. Moved to June 15 after legal review added.',
                    isAssigned: true,
                    assignedTopic: 'Rebrand Launch',
                  },
                ]}
                availableTopics={TOPICS}
              />
            </>
          )}
        </div>
      </aside>
    </motion.div>
  )
}
