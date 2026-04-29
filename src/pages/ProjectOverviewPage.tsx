import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Search, Plus } from 'lucide-react'
import { HeaderBar } from '../components/layout/HeaderBar'
import { TriagePanel } from '../components/layout/TriagePanel'
import { TopicCard } from '../components/cards/TopicCard'
import { TaskBoard } from '../components/project/TaskBoard'
import styles from './ProjectOverviewPage.module.css'

const PROJECTS = [
  { id: 'product-launch', name: 'Product Launch', active: true },
  { id: 'platform-v2',    name: 'Platform v2' },
  { id: 'growth',         name: 'Growth Experiments' },
  { id: 'onboarding',     name: 'Customer Onboarding' },
]

type TopicStatus = 'active' | 'decided' | 'resolved' | 'archived'

interface Topic {
  id: string
  title: string
  status: TopicStatus
  nodeCount: number
  taskCount: number
  description: string
  updatedAt: string
  members: { name: string; color: string }[]
}

const TOPICS_BY_PROJECT: Record<string, Topic[]> = {
  'product-launch': [
    {
      id: 't1',
      title: 'Rebrand Launch',
      status: 'active',
      nodeCount: 6,
      taskCount: 2,
      description: 'New visual identity rollout across all brand touchpoints.',
      updatedAt: '2h ago',
      members: [
        { name: 'Alex Kim',  color: 'var(--color-blue)' },
        { name: 'Sam Chen',  color: 'var(--color-green)' },
      ],
    },
    {
      id: 't2',
      title: 'API v3 Migration',
      status: 'active',
      nodeCount: 4,
      taskCount: 2,
      description: 'Breaking changes for enterprise customers — requires migration guide.',
      updatedAt: '2h ago',
      members: [
        { name: 'Jamie Lee', color: 'var(--color-orange)' },
      ],
    },
    {
      id: 't3',
      title: 'Q3 Budget Review',
      status: 'decided',
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
      id: 't4',
      title: 'Onboarding Revamp',
      status: 'active',
      nodeCount: 5,
      taskCount: 3,
      description: 'Reduce time-to-value for new users through improved first-run flow.',
      updatedAt: '3h ago',
      members: [
        { name: 'Alex Kim',  color: 'var(--color-blue)' },
        { name: 'Sam Chen',  color: 'var(--color-green)' },
        { name: 'Jamie Lee', color: 'var(--color-orange)' },
      ],
    },
    {
      id: 't5',
      title: 'Mobile App Beta',
      status: 'active',
      nodeCount: 2,
      taskCount: 4,
      description: 'iOS beta launch targeting Q3 — pending TestFlight approval.',
      updatedAt: '5h ago',
      members: [
        { name: 'River Song', color: 'var(--color-red)' },
      ],
    },
  ],

  'platform-v2': [
    {
      id: 't6',
      title: 'Platform Architecture',
      status: 'active',
      nodeCount: 5,
      taskCount: 3,
      description: 'Core platform redesign for scalability and multi-tenant support.',
      updatedAt: '1h ago',
      members: [
        { name: 'Alex Kim',  color: 'var(--color-blue)' },
        { name: 'Sam Chen',  color: 'var(--color-green)' },
      ],
    },
    {
      id: 't7',
      title: 'API Gateway',
      status: 'active',
      nodeCount: 3,
      taskCount: 4,
      description: 'Unified API gateway with rate limiting and authentication middleware.',
      updatedAt: '3h ago',
      members: [
        { name: 'Jamie Lee',   color: 'var(--color-orange)' },
        { name: 'Morgan Park', color: 'var(--color-purple)' },
      ],
    },
    {
      id: 't8',
      title: 'DevOps Pipeline',
      status: 'resolved',
      nodeCount: 2,
      taskCount: 0,
      description: 'CI/CD pipeline with automated testing and zero-downtime deployments.',
      updatedAt: '2d ago',
      members: [
        { name: 'Sam Chen', color: 'var(--color-green)' },
      ],
    },
  ],

  'growth': [
    {
      id: 't9',
      title: 'Pricing Page Redesign',
      status: 'resolved',
      nodeCount: 4,
      taskCount: 0,
      description: 'Updated pricing tiers and comparison table shipped to production.',
      updatedAt: '3d ago',
      members: [
        { name: 'Alex Kim',   color: 'var(--color-blue)' },
        { name: 'River Song', color: 'var(--color-red)' },
      ],
    },
    {
      id: 't10',
      title: 'SEO Optimization',
      status: 'active',
      nodeCount: 2,
      taskCount: 3,
      description: 'Technical SEO improvements targeting 30% organic traffic growth.',
      updatedAt: '4h ago',
      members: [
        { name: 'Alex Kim', color: 'var(--color-blue)' },
        { name: 'Sam Chen', color: 'var(--color-green)' },
      ],
    },
    {
      id: 't11',
      title: 'Referral Program',
      status: 'active',
      nodeCount: 3,
      taskCount: 2,
      description: 'Two-sided referral mechanics with reward tiers and tracking.',
      updatedAt: '2h ago',
      members: [
        { name: 'Morgan Park', color: 'var(--color-purple)' },
      ],
    },
  ],

  'onboarding': [
    {
      id: 't12',
      title: 'Onboarding Flow',
      status: 'active',
      nodeCount: 5,
      taskCount: 3,
      description: 'Reduce time-to-value for new users through improved first-run experience.',
      updatedAt: '2h ago',
      members: [
        { name: 'Alex Kim',  color: 'var(--color-blue)' },
        { name: 'Sam Chen',  color: 'var(--color-green)' },
        { name: 'Jamie Lee', color: 'var(--color-orange)' },
      ],
    },
    {
      id: 't13',
      title: 'Help Center Redesign',
      status: 'active',
      nodeCount: 3,
      taskCount: 2,
      description: 'Restructured help center with better search and article organization.',
      updatedAt: '1d ago',
      members: [
        { name: 'Morgan Park', color: 'var(--color-purple)' },
        { name: 'Taylor B',    color: 'var(--color-teal)' },
      ],
    },
  ],
}

const PROJECT_META: Record<string, {
  name: string
  members: { name: string; color: string }[]
  memberCount: number
  triageCount: number
}> = {
  'product-launch': {
    name: 'Product Launch',
    members: [
      { name: 'Alex Kim',    color: 'var(--color-blue)' },
      { name: 'Sam Chen',    color: 'var(--color-green)' },
      { name: 'Jamie Lee',   color: 'var(--color-orange)' },
      { name: 'Morgan Park', color: 'var(--color-purple)' },
      { name: 'River Song',  color: 'var(--color-red)' },
    ],
    memberCount: 12,
    triageCount: 5,
  },
  'platform-v2': {
    name: 'Platform v2',
    members: [
      { name: 'Alex Kim',    color: 'var(--color-blue)' },
      { name: 'Sam Chen',    color: 'var(--color-green)' },
      { name: 'Jamie Lee',   color: 'var(--color-orange)' },
    ],
    memberCount: 6,
    triageCount: 2,
  },
  'growth': {
    name: 'Growth Experiments',
    members: [
      { name: 'Alex Kim', color: 'var(--color-blue)' },
      { name: 'Sam Chen', color: 'var(--color-green)' },
    ],
    memberCount: 4,
    triageCount: 0,
  },
  'onboarding': {
    name: 'Customer Onboarding',
    members: [
      { name: 'Alex Kim',    color: 'var(--color-blue)' },
      { name: 'Sam Chen',    color: 'var(--color-green)' },
      { name: 'Jamie Lee',   color: 'var(--color-orange)' },
    ],
    memberCount: 5,
    triageCount: 1,
  },
}

const STATUS_FILTERS = [
  { key: 'all',      label: 'All' },
  { key: 'active',   label: 'Active' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'decided',  label: 'Decided' },
  { key: 'archived', label: 'Archived' },
]

interface ProjectOverviewPageProps {
  activeProjectId?: string | null
  onTopicClick?: (id: string) => void
  onHome?: () => void
}

export function ProjectOverviewPage({ activeProjectId, onTopicClick, onHome }: ProjectOverviewPageProps) {
  const [triageOpen, setTriageOpen] = useState(false)
  const [activeView, setActiveView] = useState<'topics' | 'tasks'>('topics')
  const [search, setSearch]         = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const projectId = activeProjectId || 'product-launch'
  const meta      = PROJECT_META[projectId] ?? PROJECT_META['product-launch']
  const topics    = TOPICS_BY_PROJECT[projectId] ?? TOPICS_BY_PROJECT['product-launch']

  const filtered = topics.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || t.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <>
      <div className={styles.main}>
        <HeaderBar
          breadcrumb={[{ label: meta.name }]}
          onHomeClick={onHome}
          members={meta.members}
          memberCount={meta.memberCount}
          activeView={activeView}
          onViewChange={setActiveView}
          triageCount={meta.triageCount}
          onTriageOpen={() => setTriageOpen(true)}
        />

        {activeView === 'tasks' ? (
          <TaskBoard activeProjectId={projectId} />
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
            newCount={meta.triageCount}
          />
        )}
      </AnimatePresence>
    </>
  )
}
