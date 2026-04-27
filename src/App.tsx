import { Calendar, Ban, Wallet, Pin, CircleDot, CheckCircle2, Clock3, Archive, Sparkles, Plus } from 'lucide-react'
import { TopicCard } from './components/cards/TopicCard'
import { Sidebar } from './components/layout/Sidebar'
import { HeaderBar } from './components/layout/HeaderBar'
import { AvatarGroup } from './components/primitives/AvatarGroup'
import { Breadcrumb } from './components/primitives/Breadcrumb'
import { TabBar } from './components/primitives/TabBar'
import { SuggestedTopicCard } from './components/cards/SuggestedTopicCard'
import { TriageNode } from './components/nodes/TriageNode'
import { SourceCard } from './components/cards/SourceCard'
import { SelectDropdown } from './components/primitives/SelectDropdown'
import { ProjectOverviewPage } from './pages/ProjectOverviewPage'
import { useState } from 'react'
import './styles/styleguide.css'

const colorGroups = [
  {
    label: 'Brand',
    tokens: [
      { name: '--brand-primary',       label: 'Primary' },
      { name: '--brand-primary-muted', label: 'Primary Muted' },
    ],
  },
  {
    label: 'Backgrounds',
    tokens: [
      { name: '--bg-base',      label: 'Base' },
      { name: '--bg-primary',   label: 'Primary' },
      { name: '--bg-secondary', label: 'Secondary' },
      { name: '--bg-elevated',  label: 'Elevated' },
      { name: '--bg-overlay',   label: 'Overlay' },
      { name: '--bg-sidebar',   label: 'Sidebar' },
    ],
  },
  {
    label: 'Semantic — HIG Dark',
    tokens: [
      { name: '--color-blue',   label: 'Blue' },
      { name: '--color-green',  label: 'Green' },
      { name: '--color-red',    label: 'Red' },
      { name: '--color-orange', label: 'Orange' },
      { name: '--color-yellow', label: 'Yellow' },
      { name: '--color-purple', label: 'Purple' },
      { name: '--color-teal',   label: 'Teal' },
    ],
  },
  {
    label: 'Semantic — Muted surfaces',
    tokens: [
      { name: '--color-blue-muted',   label: 'Blue Muted' },
      { name: '--color-green-muted',  label: 'Green Muted' },
      { name: '--color-red-muted',    label: 'Red Muted' },
      { name: '--color-orange-muted', label: 'Orange Muted' },
      { name: '--color-purple-muted', label: 'Purple Muted' },
      { name: '--color-teal-muted',   label: 'Teal Muted' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { name: '--text-primary',   label: 'Primary' },
      { name: '--text-secondary', label: 'Secondary' },
      { name: '--text-tertiary',  label: 'Tertiary' },
      { name: '--text-disabled',  label: 'Disabled' },
    ],
  },
]

const typeSamples = [
  { label: 'H1 · Page Title',     font: 'heading', size: '3xl',  weight: 700, text: 'Product Launch Q3' },
  { label: 'H2 · Topic Title',    font: 'heading', size: '2xl',  weight: 700, text: 'Rebrand Launch' },
  { label: 'H3 · Section Title',  font: 'heading', size: 'xl',   weight: 500, text: 'Context Overview' },
  { label: 'H4 · Panel Header',   font: 'heading', size: 'lg',   weight: 500, text: 'Comments' },
  { label: 'Body · Node Title',   font: 'body',    size: 'md',   weight: 500, text: 'Launch date confirmed: June 15' },
  { label: 'Body · Description',  font: 'body',    size: 'base', weight: 400, text: 'The product launch has been confirmed for June 15. This aligns with the Q2 board commitment and the partnership announcement.' },
  { label: 'Meta · Timestamp',    font: 'body',    size: 'sm',   weight: 400, text: 'Apr 15 · via Google Meet · suggested by AI', muted: true },
  { label: 'Label · Uppercase',   font: 'body',    size: 'xs',   weight: 500, text: 'CONTEXT · 6 NODES', upper: true, muted: true },
]

const spacingTokens = [
  { name: 'xs',  val: '4px' },
  { name: 'sm',  val: '8px' },
  { name: 'md',  val: '12px' },
  { name: 'lg',  val: '16px' },
  { name: 'xl',  val: '20px' },
  { name: '2xl', val: '24px' },
  { name: '3xl', val: '32px' },
  { name: '4xl', val: '40px' },
  { name: '5xl', val: '48px' },
  { name: '6xl', val: '64px' },
]

const radiusTokens = [
  { name: '--radius-sm',   label: 'sm · 4px',  desc: 'badges, tags' },
  { name: '--radius-md',   label: 'md · 8px',  desc: 'cards, inputs, nodes' },
  { name: '--radius-lg',   label: 'lg · 12px', desc: 'panels, expanded cards' },
  { name: '--radius-xl',   label: 'xl · 16px', desc: 'slide-out panel' },
  { name: '--radius-pill', label: 'pill',       desc: 'count badges, status' },
]

const nodeTypes = ['date', 'blocker', 'budget', 'fact'] as const
const nodeIcons = {
  date:    Calendar,
  blocker: Ban,
  budget:  Wallet,
  fact:    Pin,
}
const statuses = ['active', 'progress', 'resolved', 'decided', 'archived'] as const
const statusLabels = { active: 'Active', progress: 'In Progress', resolved: 'Resolved', decided: 'Decided', archived: 'Archived' }
const statusIcons = {
  active:   CircleDot,
  progress: Clock3,
  resolved: CheckCircle2,
  decided:  CheckCircle2,
  archived: Archive,
}

const mockTopics = ['Rebrand Launch', 'API v3 Migration', 'Q3 Budget Review', 'Onboarding Revamp']

function SelectDropdownDemo() {
  const [val, setVal] = useState<string | undefined>(undefined)
  const options = [
    { value: 'Rebrand Launch', label: 'Rebrand Launch', isAI: true },
    { value: 'API v3 Migration', label: 'API v3 Migration', color: 'var(--color-blue)' },
    { value: 'Q3 Budget Review', label: 'Q3 Budget Review', color: 'var(--color-green)' },
    { value: 'Onboarding Revamp', label: 'Onboarding Revamp', color: 'var(--color-orange)' },
  ]
  return <SelectDropdown options={options} value={val} onChange={setVal} placeholder="Choose a topic…" />
}

export default function App() {
  const [view, setView] = useState<'page' | 'ds'>('page')
  const [activeTab, setActiveTab] = useState('details')

  if (view === 'page') {
    return (
      <>
        <ProjectOverviewPage />
        <button
          onClick={() => setView('ds')}
          style={{
            position: 'fixed', bottom: 16, right: 16, zIndex: 999,
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)', background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
            padding: '4px 10px', cursor: 'pointer',
          }}
        >
          Design System ↗
        </button>
      </>
    )
  }

  return (
    <div className="sg-root">

      <header className="sg-header">
        <img src="/img/Logo.svg" alt="ThreadBase" className="sg-logo" />
        <span className="sg-badge-tag">Design System · v0.1</span>
      </header>

      <main className="sg-main">

        {/* COLORS */}
        <section className="sg-section">
          <h2 className="sg-section-title">Colors</h2>
          {colorGroups.map(group => (
            <div key={group.label} className="sg-color-group">
              <p className="sg-group-label">{group.label}</p>
              <div className="sg-swatches">
                {group.tokens.map(t => (
                  <div key={t.name} className="sg-swatch">
                    <div className="sg-swatch-color" style={{ background: `var(${t.name})` }} />
                    <span className="sg-swatch-label">{t.label}</span>
                    <code className="sg-swatch-var">{t.name}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* TYPOGRAPHY */}
        <section className="sg-section">
          <h2 className="sg-section-title">Typography</h2>

          <div className="sg-font-families">
            <div className="sg-font-card">
              <div className="sg-font-label">Neue Machina — Headings</div>
              <div className="sg-font-specimen" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                Aa Bb Cc 0123
              </div>
              <div className="sg-font-weights">
                {[200, 300, 400, 500, 700, 800, 900].map(w => (
                  <span key={w} style={{ fontFamily: 'var(--font-heading)', fontWeight: w }}>
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div className="sg-font-card">
              <div className="sg-font-label">Intel One Mono — Body / UI</div>
              <div className="sg-font-specimen" style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                Aa Bb Cc 0123
              </div>
              <div className="sg-font-weights">
                {[300, 400, 500, 700].map(w => (
                  <span key={w} style={{ fontFamily: 'var(--font-body)', fontWeight: w }}>
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="sg-type-scale">
            {typeSamples.map(s => (
              <div key={s.label} className="sg-type-row">
                <div className="sg-type-meta">
                  <span className="sg-type-label">{s.label}</span>
                  <code className="sg-type-token">--text-{s.size} · {s.font === 'heading' ? 'Neue Machina' : 'Intel One Mono'} {s.weight}</code>
                </div>
                <div
                  className="sg-type-preview"
                  style={{
                    fontFamily:    s.font === 'heading' ? 'var(--font-heading)' : 'var(--font-body)',
                    fontSize:      `var(--text-${s.size})`,
                    fontWeight:    s.weight,
                    letterSpacing: s.font === 'heading' ? 'var(--tracking-tight)' : s.upper ? 'var(--tracking-wider)' : undefined,
                    textTransform: s.upper ? 'uppercase' : undefined,
                    color:         s.muted ? 'var(--text-secondary)' : 'var(--text-primary)',
                    lineHeight:    s.font === 'heading' ? 'var(--leading-tight)' : 'var(--leading-normal)',
                  }}
                >
                  {s.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SPACING */}
        <section className="sg-section">
          <h2 className="sg-section-title">Spacing</h2>
          <div className="sg-spacing-list">
            {spacingTokens.map(s => (
              <div key={s.name} className="sg-spacing-row">
                <code className="sg-spacing-token">--space-{s.name}</code>
                <div className="sg-spacing-bar-wrap">
                  <div
                    className="sg-spacing-bar"
                    style={{ width: `var(--space-${s.name})`, height: '10px' }}
                  />
                </div>
                <span className="sg-spacing-val">{s.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* BORDER RADIUS */}
        <section className="sg-section">
          <h2 className="sg-section-title">Border Radius</h2>
          <div className="sg-radius-list">
            {radiusTokens.map(r => (
              <div key={r.name} className="sg-radius-row">
                <div
                  className="sg-radius-box"
                  style={{ borderRadius: `var(${r.name})` }}
                />
                <div>
                  <code className="sg-radius-name">{r.label}</code>
                  <span className="sg-radius-desc">{r.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SHADOWS */}
        <section className="sg-section">
          <h2 className="sg-section-title">Shadows</h2>
          <div className="sg-shadow-row">
            {['sm', 'md', 'lg', 'xl'].map(s => (
              <div key={s} className="sg-shadow-card" style={{ boxShadow: `var(--shadow-${s})` }}>
                <code>--shadow-{s}</code>
              </div>
            ))}
          </div>
        </section>

        {/* NODE TYPES */}
        <section className="sg-section">
          <h2 className="sg-section-title">Node Type Accents</h2>
          <div className="sg-nodes">
            {nodeTypes.map(type => {
              const Icon = nodeIcons[type]
              return (
                <div key={type} className="sg-node">
                  <div className="sg-node-accent" style={{ background: `var(--node-${type}-color)` }} />
                  <div className="sg-node-content">
                    <span className="sg-node-title" style={{ color: `var(--node-${type}-color)` }}>
                      <Icon size={13} strokeWidth={1.5} />
                      <span className="sg-node-title-text">{type.charAt(0).toUpperCase() + type.slice(1)} Node</span>
                    </span>
                    <span className="sg-node-desc">Sample context node — {type} type</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* STATUS BADGES */}
        <section className="sg-section">
          <h2 className="sg-section-title">Status Badges</h2>

          <div className="sg-badge-group">
            <p className="sg-group-label">Default</p>
            <div className="sg-status-row">
              {statuses.map(s => (
                <span key={s} className="sg-status" style={{ '--sc': `var(--status-${s}-color)`, background: `var(--status-${s}-bg)` } as React.CSSProperties}>
                  {statusLabels[s]}
                </span>
              ))}
            </div>
          </div>

          <div className="sg-badge-group">
            <p className="sg-group-label">With dot</p>
            <div className="sg-status-row">
              {statuses.map(s => (
                <span key={s} className="sg-status" style={{ '--sc': `var(--status-${s}-color)`, background: `var(--status-${s}-bg)` } as React.CSSProperties}>
                  <span className="sg-status-dot" />
                  {statusLabels[s]}
                </span>
              ))}
            </div>
          </div>

          <div className="sg-badge-group">
            <p className="sg-group-label">With icon</p>
            <div className="sg-status-row">
              {statuses.map(s => {
                const Icon = statusIcons[s]
                return (
                  <span key={s} className="sg-status" style={{ '--sc': `var(--status-${s}-color)`, background: `var(--status-${s}-bg)` } as React.CSSProperties}>
                    <Icon size={11} strokeWidth={1.5} />
                    {statusLabels[s]}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="sg-badge-group">
            <p className="sg-group-label">AI tag</p>
            <div className="sg-status-row">
              <span className="sg-status sg-status-ai">
                <Sparkles size={11} strokeWidth={1.5} />
                AI pick
              </span>
              <span className="sg-status sg-status-ai">
                <Sparkles size={11} strokeWidth={1.5} />
                AI suggested
              </span>
            </div>
          </div>

        </section>

        {/* BUTTONS */}
        <section className="sg-section">
          <h2 className="sg-section-title">Buttons</h2>

          {(['primary', 'secondary', 'tertiary'] as const).map(variant => (
            <div key={variant} className="sg-badge-group">
              <p className="sg-group-label">{variant}</p>
              <div className="sg-btn-row">
                {(['sm', 'md', 'lg'] as const).map(size => (
                  <button key={size} className={`sg-btn sg-btn--${variant} sg-btn--${size}`}>
                    <Plus size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} strokeWidth={1.5} />
                    <span className="sg-btn-text">Button {size}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="sg-badge-group">
            <p className="sg-group-label">Icon only</p>
            <div className="sg-btn-row">
              {(['primary', 'secondary', 'tertiary'] as const).map(variant => (
                <button key={variant} className={`sg-btn sg-btn--${variant} sg-btn--md sg-btn--icon`}>
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>

          <div className="sg-badge-group">
            <p className="sg-group-label">Disabled</p>
            <div className="sg-btn-row">
              {(['primary', 'secondary', 'tertiary'] as const).map(variant => (
                <button key={variant} disabled className={`sg-btn sg-btn--${variant} sg-btn--md`}>
                  <Plus size={14} strokeWidth={1.5} />
                  <span className="sg-btn-text">Button md</span>
                </button>
              ))}
            </div>
          </div>

        </section>

        {/* TABS */}
        <section className="sg-section">
          <h2 className="sg-section-title">Tab Bar</h2>
          <TabBar
            active={activeTab}
            onChange={setActiveTab}
            tabs={[
              { key: 'details', label: 'My details' },
              { key: 'profile', label: 'Profile' },
              { key: 'password', label: 'Password' },
              { key: 'team', label: 'Team' },
              { key: 'notifications', label: 'Notifications', count: 2 },
              { key: 'integrations', label: 'Integrations' },
            ]}
          />
        </section>

        {/* SUGGESTED TOPIC */}
        <section className="sg-section">
          <h2 className="sg-section-title">Suggested Topic Card</h2>
          <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <SuggestedTopicCard topicName="Launch Timeline Planning" />
            <SuggestedTopicCard topicName="Q3 Budget Allocation" />
          </div>
        </section>

        {/* SELECT DROPDOWN */}
        <section className="sg-section">
          <h2 className="sg-section-title">Select Dropdown</h2>
          <div style={{ maxWidth: 280, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <SelectDropdownDemo />
          </div>
        </section>

        {/* TRIAGE NODE */}
        <section className="sg-section">
          <h2 className="sg-section-title">Triage Node</h2>
          <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <TriageNode type="date" title="Launch date: June 15" description="Confirmed with engineering that June 15 works if legal sign-off comes by May 28." suggestedTopic="Rebrand Launch" topics={mockTopics} />
            <TriageNode type="blocker" title="Legal review pending on logo" description="Legal needs 5 business days to review the updated logo. Hard dependency for June 15." sourceQuote="We can't ship the new logo without legal sign-off. They said minimum 5 business days." sourceLabel="Product Sync Call · 14:32" sourceLink="Open recording" suggestedTopic="Rebrand Launch" topics={mockTopics} />
            <TriageNode type="budget" title="Budget approved: $45k for external agency" description="Finance confirmed budget allocation for external design agency." isAssigned assignedTopic="Q3 Budget Review" topics={mockTopics} />
          </div>
        </section>

        {/* SOURCE CARD */}
        <section className="sg-section">
          <h2 className="sg-section-title">Source Card (Context Triage)</h2>
          <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <SourceCard
              source="call"
              name="Product Sync Call"
              timestamp="Apr 15 · 14:32"
              itemCount={3}
              defaultExpanded
              aiSummary="Discussed launch timeline, legal blockers, agency budget. June 15 is the target date pending legal sign-off."
              suggestedTopics={[{ name: 'Launch Timeline Planning' }]}
              nodes={[
                { id: '1', type: 'date', title: 'Launch date: June 15', description: 'Confirmed with engineering that June 15 works if legal sign-off comes by May 28.', sourceQuote: 'Sarah confirmed June 15 is doable from eng side. Hard dep on legal — need sign-off by end of May at the latest.', sourceLabel: 'Product Sync Call · 14:32', sourceLink: 'Open recording', suggestedTopic: 'Rebrand Launch' },
                { id: '2', type: 'blocker', title: 'Legal review pending on logo', description: 'Legal needs 5 business days for new logo review.', isAssigned: true, assignedTopic: 'Rebrand Launch' },
                { id: '3', type: 'fact', title: 'Color palette v2 finalized', description: 'Team agreed on updated color palette during sync.' },
              ]}
              availableTopics={mockTopics}
            />
            <SourceCard source="slack" name="Slack #general" timestamp="Apr 16" itemCount={2} />
            <SourceCard source="doc" name="Google Doc — Q3 Spec" timestamp="Apr 14" itemCount={1} />
          </div>
        </section>

        {/* BREADCRUMB */}
        <section className="sg-section">
          <h2 className="sg-section-title">Breadcrumb</h2>
          <div className="sg-badge-group">
            <p className="sg-group-label">Short</p>
            <Breadcrumb items={[{ label: 'Product Launch', onClick: () => {} }, { label: 'Rebrand Launch' }]} />
          </div>
          <div className="sg-badge-group">
            <p className="sg-group-label">With ellipsis</p>
            <Breadcrumb items={[{ label: 'Workspace', onClick: () => {} }, { label: 'Product Launch', onClick: () => {} }, { label: 'Rebrand Launch', onClick: () => {} }, { label: 'Rebrand Launch' }]} maxVisible={2} />
          </div>
        </section>

        {/* AVATAR GROUP */}
        <section className="sg-section">
          <h2 className="sg-section-title">Avatar Group</h2>
          <div className="sg-badge-group">
            <p className="sg-group-label">Small</p>
            <AvatarGroup size="sm" avatars={[{name:'Anna Kim'},{name:'Max Rivera'},{name:'Jake Lee'},{name:'Sara Chen'},{name:'Tom Park'},{name:'Lisa Wong'}]} max={4} />
          </div>
          <div className="sg-badge-group">
            <p className="sg-group-label">Medium</p>
            <AvatarGroup size="md" avatars={[{name:'Anna Kim'},{name:'Max Rivera'},{name:'Jake Lee'},{name:'Sara Chen'},{name:'Tom Park'},{name:'Lisa Wong'}]} max={4} />
          </div>
          <div className="sg-badge-group">
            <p className="sg-group-label">Large</p>
            <AvatarGroup size="lg" avatars={[{name:'Anna Kim'},{name:'Max Rivera'},{name:'Jake Lee'},{name:'Sara Chen'},{name:'Tom Park'},{name:'Lisa Wong'}]} max={4} />
          </div>
        </section>

        {/* TOPIC CARDS */}
        <section className="sg-section">
          <h2 className="sg-section-title">Topic Card</h2>
          <div className="sg-cards-grid">
            <TopicCard title="Rebrand Launch" status="active" nodeCount={6} taskCount={2} description="New visual identity rollout across all customer-facing touchpoints." updatedAt="2h ago" members={[{name:'Anna Kim'},{name:'Max Rivera'},{name:'Jake Lee'},{name:'Sara Chen'}]} />
            <TopicCard title="API v3 Migration" status="progress" nodeCount={4} taskCount={5} description="Breaking changes for enterprise clients. Versioning strategy to be finalized." updatedAt="4h ago" members={[{name:'Tom Park'},{name:'Lisa Wong'}]} />
            <TopicCard title="Q3 Budget Review" status="decided" nodeCount={3} taskCount={1} description="Budget allocation finalized after review with finance team." updatedAt="1d ago" members={[{name:'Anna Kim'},{name:'Jake Lee'},{name:'Sara Chen'},{name:'Tom Park'},{name:'Max Rivera'}]} />
            <TopicCard title="Onboarding Revamp" status="resolved" nodeCount={5} taskCount={0} description="Reduce time-to-value for new users. A/B test completed." updatedAt="3d ago" members={[{name:'Lisa Wong'},{name:'Anna Kim'}]} />
          </div>
        </section>

        {/* SIDEBAR */}
        <section className="sg-section">
          <h2 className="sg-section-title">Sidebar</h2>
          <div className="sg-sidebar-preview">
            <Sidebar
              mode="project"
              projects={[
                { id: '1', name: 'Product Launch', active: true },
                { id: '2', name: 'Platform v2' },
                { id: '3', name: 'Growth Experiments' },
              ]}
              activeProjectId="1"
            />
          </div>
        </section>

        {/* HEADER BAR */}
        <section className="sg-section">
          <h2 className="sg-section-title">Header Bar</h2>
          <div className="sg-header-preview">
            <HeaderBar
              projectName="Product Launch"
              stats="8 topics · 3 members"
              triageCount={5}
              activeView="topics"
              onViewChange={() => {}}
              onTriageOpen={() => {}}
            />
          </div>
          <div className="sg-header-preview">
            <HeaderBar
              projectName=""
              breadcrumb={[
                { label: 'Product Launch', onClick: () => {} },
                { label: 'Rebrand Launch' },
              ]}
            />
          </div>
        </section>

      </main>
      <button
        onClick={() => setView('page')}
        style={{
          position: 'fixed', bottom: 16, left: 16, zIndex: 999,
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)', background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
          padding: '4px 10px', cursor: 'pointer',
        }}
      >
        Project Page ↗
      </button>
    </div>
  )
}
