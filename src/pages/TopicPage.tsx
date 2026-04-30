import { useState, useRef, useEffect } from 'react'
import { Plus, ArrowDownUp, ArrowRight, Link2, MoreVertical, Link, Copy, FolderInput, CheckCircle2, Archive, Trash2, ChevronDown } from 'lucide-react'
import { HeaderBar } from '../components/layout/HeaderBar'
import { DecisionBlock } from '../components/topic/DecisionBlock'
import type { Decision } from '../components/topic/DecisionBlock'
import { DecisionModal } from '../components/interactive/DecisionModal'
import { ContextNode } from '../components/topic/ContextNode'
import { RightPanel } from '../components/topic/RightPanel'
import { TOPIC_MAP, ALL_TASKS } from '../data/projectData'
import styles from './TopicPage.module.css'

const STATUS_LABEL: Record<string, string> = {
  active:   'Active',
  decided:  'Decided',
  resolved: 'Resolved',
  archived: 'Archived',
}

interface TopicPageProps {
  activeTopicId?: string | null
  onBack?: () => void
  onHome?: () => void
}

export function TopicPage({ activeTopicId, onBack, onHome }: TopicPageProps) {
  const topic      = TOPIC_MAP[activeTopicId ?? 't1'] ?? TOPIC_MAP['t1']
  const topicTasks = ALL_TASKS.filter(t => t.topicId === topic.id)

  const [topicMenuOpen, setTopicMenuOpen] = useState(false)
  const topicMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!topicMenuOpen) return
    function handleClick(e: MouseEvent) {
      if (topicMenuRef.current && !topicMenuRef.current.contains(e.target as Node)) {
        setTopicMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [topicMenuOpen])

  const [decision, setDecision]                   = useState<Decision | undefined>(undefined)
  const [decisionModalOpen, setDecisionModalOpen] = useState(false)
  const [decisionModalMode, setDecisionModalMode] = useState<'create' | 'edit'>('create')

  function openCreateDecision() { setDecisionModalMode('create'); setDecisionModalOpen(true) }
  function openEditDecision()   { setDecisionModalMode('edit');   setDecisionModalOpen(true) }

  function handleConfirmDecision(d: Decision) { setDecision(d); setDecisionModalOpen(false) }
  function handleRemoveDecision()             { setDecision(undefined) }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <HeaderBar
          breadcrumb={[
            { label: topic.projectName, onClick: onBack },
            { label: topic.title },
          ]}
          onHomeClick={onHome}
          members={topic.members}
          memberCount={topic.members.length}
        />

        <div className={styles.content}>
          <div className={styles.topicHeader}>
            <div className={styles.topicHeaderRow}>
              <div className={styles.statusRow}>
                <button className={`${styles.statusBadge} ${styles[`statusBadge_${topic.status}`]}`}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusBadgeText}>{STATUS_LABEL[topic.status] ?? 'Active'}</span>
                  <ChevronDown size={11} strokeWidth={1.5} className={styles.statusChevron} />
                </button>
                <span className={styles.topicMeta}>
                  Created by
                  <span className={styles.topicMetaName} style={{ color: topic.createdBy.color }}>
                    {topic.createdBy.name}
                  </span>
                  · {topic.createdAt}
                </span>
              </div>
              <div className={styles.topicActions}>
                <button className={styles.copyLinkBtn}>
                  <Link size={13} strokeWidth={1.5} />
                  Copy link
                </button>
                <div ref={topicMenuRef} className={styles.topicMenu}>
                  <button className={styles.topicMenuBtn} onClick={() => setTopicMenuOpen(v => !v)}>
                    <MoreVertical size={16} strokeWidth={1.5} />
                  </button>
                  {topicMenuOpen && (
                    <div className={styles.topicDropdown}>
                      <button className={styles.topicDropdownItem} onClick={() => setTopicMenuOpen(false)}>
                        <Copy size={13} strokeWidth={1.5} />
                        Duplicate
                      </button>
                      <button className={styles.topicDropdownItem} onClick={() => setTopicMenuOpen(false)}>
                        <FolderInput size={13} strokeWidth={1.5} />
                        Move to project…
                        <ArrowRight size={11} strokeWidth={1.5} className={styles.topicDropdownArrow} />
                      </button>
                      <button className={styles.topicDropdownItem} onClick={() => setTopicMenuOpen(false)}>
                        <CheckCircle2 size={13} strokeWidth={1.5} />
                        Mark as Resolved
                      </button>
                      <button className={styles.topicDropdownItem} onClick={() => setTopicMenuOpen(false)}>
                        <Archive size={13} strokeWidth={1.5} />
                        Archive
                      </button>
                      <div className={styles.topicDropdownSeparator} />
                      <button className={`${styles.topicDropdownItem} ${styles.topicDropdownItemDanger}`} onClick={() => setTopicMenuOpen(false)}>
                        <Trash2 size={13} strokeWidth={1.5} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h1 className={styles.topicTitle}>{topic.title}</h1>
            <p className={styles.topicDesc}>{topic.description}</p>

            <div className={styles.linkedTopics}>
              {(topic.linkedTopics?.length ?? 0) > 0 && (
                <>
                  <span className={styles.linkedLabel}>
                    <Link2 size={11} strokeWidth={1.5} />
                    Linked
                  </span>
                  {topic.linkedTopics!.map(t => (
                    <button key={t.id} className={styles.linkedChip}>
                      {t.title}
                      <span className={styles.linkedRelation}>{t.relation}</span>
                      <ArrowRight size={10} strokeWidth={1.5} />
                    </button>
                  ))}
                </>
              )}
              <button className={styles.linkedAdd}>+ Link</button>
            </div>
          </div>

          <DecisionBlock
            decision={decision}
            onAddDecision={openCreateDecision}
            onEditDecision={openEditDecision}
            onRemoveDecision={handleRemoveDecision}
          />

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
              {topic.nodes.map((node, i) => (
                <ContextNode
                  key={i}
                  type={node.type}
                  title={node.title}
                  description={node.description}
                  sourceLabel={node.sourceLabel}
                  sourceType={node.sourceType}
                  sourceLink={node.sourceLink}
                  sourceQuote={node.sourceQuote}
                  createdBy={node.createdBy}
                  myNote={node.myNote}
                  starred={node.starred}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <RightPanel tasks={topicTasks} />

      <DecisionModal
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        onConfirm={handleConfirmDecision}
        topicName={topic.title}
        existingTasks={topicTasks}
        initialDecision={decisionModalMode === 'edit' ? decision : undefined}
      />
    </div>
  )
}
