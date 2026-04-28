import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Search, Plus } from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { HeaderBar } from '../components/layout/HeaderBar'
import { TriagePanel } from '../components/layout/TriagePanel'
import { TopicCard } from '../components/cards/TopicCard'
import { TaskBoard } from '../components/project/TaskBoard'
import styles from './ProjectOverviewPage.module.css'

const PROJECTS = [
  { id: 'product-launch', name: 'Product Launch', active: true },
  { id: 'platform-v2',    name: 'Platform v2' },
  { id: 'growth',         name: 'Growth Experiments' },
]

const TOPICS = [
  {
    id: '1',
    title: 'Rebrand Launch',
    status: 'active' as const,
    nodeCount: 6,
    taskCount: 2,
    description: 'New visual identity rollout across all brand touchpoints.',
    updatedAt: '2h ago',
    members: [
      { name: 'Alex Kim',    color: 'var(--color-blue)' },
      { name: 'Sam Chen',    color: 'var(--color-green)' },
    ],
  },
  {
    id: '2',
    title: 'API v3 Migration',
    status: 'active' as const,
    nodeCount: 4,
    taskCount: 2,
    description: 'Breaking changes for enterprise customers — requires migration guide.',
    updatedAt: '2h ago',
    members: [
      { name: 'Jamie Lee',   color: 'var(--color-orange)' },
    ],
  },
  {
    id: '3',
    title: 'Q3 Budget Review',
    status: 'decided' as const,
    nodeCount: 3,
    taskCount: 0,
    description: 'Budget allocation finalized by finance and approved by leadership.',
    updatedAt: '1d ago',
    members: [
      { name: 'Morgan Park', color: 'var(--color-purple)' },
      { name: 'Taylor B',    color: 'var(--color-teal)' },
    ],
  },
  {
    id: '4',
    title: 'Onboarding Revamp',
    status: 'active' as const,
    nodeCount: 5,
    taskCount: 3,
    description: 'Reduce time-to-value for new users through improved first-run flow.',
    updatedAt: '3h ago',
    members: [
      { name: 'Alex Kim',    color: 'var(--color-blue)' },
      { name: 'Sam Chen',    color: 'var(--color-green)' },
      { name: 'Jamie Lee',   color: 'var(--color-orange)' },
    ],
  },
  {
    id: '5',
    title: 'Mobile App Beta',
    status: 'active' as const,
    nodeCount: 2,
    taskCount: 4,
    description: 'iOS beta launch targeting Q3 — pending TestFlight approval.',
    updatedAt: '5h ago',
    members: [
      { name: 'River Song',  color: 'var(--color-red)' },
    ],
  },
  {
    id: '6',
    title: 'Support Automation',
    status: 'active' as const,
    nodeCount: 3,
    taskCount: 1,
    description: 'AI-powered ticket routing to reduce first-response time by 60%.',
    updatedAt: '2h ago',
    members: [
      { name: 'Morgan Park', color: 'var(--color-purple)' },
      { name: 'Taylor B',    color: 'var(--color-teal)' },
    ],
  },
  {
    id: '7',
    title: 'Pricing Page Redesign',
    status: 'resolved' as const,
    nodeCount: 4,
    taskCount: 0,
    description: 'Updated pricing tiers and comparison table shipped to production.',
    updatedAt: '3d ago',
    members: [
      { name: 'Alex Kim',    color: 'var(--color-blue)' },
      { name: 'River Song',  color: 'var(--color-red)' },
    ],
  },
]

const STATUS_FILTERS = [
  { key: 'all',      label: 'All' },
  { key: 'active',   label: 'Active' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'decided',  label: 'Decided' },
  { key: 'archived', label: 'Archived' },
]

interface ProjectOverviewPageProps {
  onTopicClick?: (id: string) => void
  onHome?: () => void
}

export function ProjectOverviewPage({ onTopicClick, onHome }: ProjectOverviewPageProps) {
  const [triageOpen, setTriageOpen]       = useState(false)
  const [activeView, setActiveView]       = useState<'topics' | 'tasks'>('topics')
  const [activeProject, setActiveProject] = useState('product-launch')
  const [search, setSearch]               = useState('')
  const [statusFilter, setStatusFilter]   = useState('all')

  const filtered = TOPICS.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || t.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className={styles.page}>
      <Sidebar
        mode="project"
        projects={PROJECTS}
        activeProjectId={activeProject}
        onProjectClick={setActiveProject}
        onHomeClick={onHome}
      />

      <div className={styles.main}>
        <HeaderBar
          breadcrumb={[
            { label: 'Product Launch' },
          ]}
          onHomeClick={onHome}
          members={[
            { name: 'Alex Kim',    color: 'var(--color-blue)' },
            { name: 'Sam Chen',    color: 'var(--color-green)' },
            { name: 'Jamie Lee',   color: 'var(--color-orange)' },
            { name: 'Morgan Park', color: 'var(--color-purple)' },
            { name: 'River Song',  color: 'var(--color-red)' },
          ]}
          memberCount={12}
          activeView={activeView}
          onViewChange={setActiveView}
          triageCount={5}
          onTriageOpen={() => setTriageOpen(true)}
        />

        {activeView === 'tasks' ? (
          <TaskBoard />
        ) : (
          <div className={styles.content}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <button className="sg-btn sg-btn--primary sg-btn--md">
                  <Plus size={13} strokeWidth={1.5} />
                  <span className="sg-btn-text">Add topic</span>
                </button>
                <div className={styles.searchBox}>
                  <Search size={12} strokeWidth={1.5} className={styles.searchIcon} />
                  <input
                    className={styles.searchInput}
                    placeholder="Search topics…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className={styles.filterPills}>
                  {STATUS_FILTERS.map(f => (
                    <button
                      key={f.key}
                      className={`${styles.pill} ${statusFilter === f.key ? styles.pillActive : ''}`}
                      onClick={() => setStatusFilter(f.key)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <span className={styles.topicCount}>{filtered.length} topics</span>
            </div>

            <div className={styles.topicGrid}>
              {filtered.map(t => (
                <TopicCard key={t.id} {...t} projects={PROJECTS} onClick={() => onTopicClick?.(t.id)} />
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {triageOpen && (
          <TriagePanel
            onClose={() => setTriageOpen(false)}
            newCount={5}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
