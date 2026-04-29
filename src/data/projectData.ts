export type Priority   = 'urgent' | 'high' | 'medium' | 'low'
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export type NodeType   = 'date' | 'blocker' | 'budget' | 'fact'
export type TopicStatus = 'active' | 'decided' | 'resolved' | 'archived'
export type SourceType  = 'slack' | 'meet' | 'docs' | 'notion' | 'github' | 'analytics'

export interface Member { name: string; color: string }

export interface Task {
  id: string
  title: string
  priority: Priority
  status: TaskStatus
  assignee: Member
  dueDate?: string
  blocked?: boolean
  comments?: number
  topicId: string
  topicTitle: string
  projectId: string
}

export interface ContextNode {
  type: NodeType
  title: string
  description: string
  sourceLabel: string
  sourceType?: SourceType
  sourceLink: string
  sourceQuote?: string
  createdBy: Member
  myNote?: string
  starred?: boolean
}

export interface LinkedTopic { id: string; title: string; relation: string }

export interface TopicData {
  id: string
  projectId: string
  projectName: string
  title: string
  description: string
  status: TopicStatus
  createdBy: Member
  createdAt: string
  linkedTopics?: LinkedTopic[]
  nodes: ContextNode[]
  members: Member[]
}

// ── Members ──────────────────────────────────────────────────────────────────
const alex:   Member = { name: 'Alex Kim',    color: 'var(--color-blue)'   }
const sam:    Member = { name: 'Sam Chen',    color: 'var(--color-green)'  }
const jamie:  Member = { name: 'Jamie Lee',   color: 'var(--color-orange)' }
const morgan: Member = { name: 'Morgan Park', color: 'var(--color-purple)' }
const river:  Member = { name: 'River Song',  color: 'var(--color-red)'    }
const dana:   Member = { name: 'Dana Song',   color: 'var(--color-purple)' }
const max:    Member = { name: 'Max Rivera',  color: 'var(--color-green)'  }
const jake:   Member = { name: 'Jake Lee',    color: 'var(--color-orange)' }
const taylor: Member = { name: 'Taylor B',    color: 'var(--color-teal)'   }

// ── Tasks ─────────────────────────────────────────────────────────────────────
export const ALL_TASKS: Task[] = [
  // Product Launch · Rebrand Launch (t1)
  { id: 'tsk-01', title: 'Get legal sign-off on logo',     priority: 'urgent', status: 'in-progress', assignee: jake,   dueDate: 'May 28', blocked: true, comments: 1, topicId: 't1', topicTitle: 'Rebrand Launch',      projectId: 'product-launch' },
  { id: 'tsk-02', title: 'Update brand guidelines doc',    priority: 'high',   status: 'in-progress', assignee: alex,   dueDate: 'Jun 1',  comments: 3,  topicId: 't1', topicTitle: 'Rebrand Launch',      projectId: 'product-launch' },
  { id: 'tsk-03', title: 'Color palette v2',               priority: 'high',   status: 'review',      assignee: alex,                      comments: 5,  topicId: 't1', topicTitle: 'Rebrand Launch',      projectId: 'product-launch' },
  { id: 'tsk-04', title: 'Brief external agency',          priority: 'medium', status: 'todo',        assignee: max,                       comments: 1,  topicId: 't1', topicTitle: 'Rebrand Launch',      projectId: 'product-launch' },
  { id: 'tsk-05', title: 'Design new email templates',     priority: 'low',    status: 'todo',        assignee: alex,                                    topicId: 't1', topicTitle: 'Rebrand Launch',      projectId: 'product-launch' },
  // Product Launch · API v3 Migration (t2)
  { id: 'tsk-06', title: 'Review API breaking changes',    priority: 'high',   status: 'todo',        assignee: alex,   dueDate: 'May 30', comments: 2,  topicId: 't2', topicTitle: 'API v3 Migration',    projectId: 'product-launch' },
  { id: 'tsk-07', title: 'Write migration guide',          priority: 'high',   status: 'in-progress', assignee: sam,                       comments: 4,  topicId: 't2', topicTitle: 'API v3 Migration',    projectId: 'product-launch' },
  { id: 'tsk-08', title: 'Notify enterprise customers',    priority: 'medium', status: 'todo',        assignee: morgan,                                  topicId: 't2', topicTitle: 'API v3 Migration',    projectId: 'product-launch' },
  // Product Launch · Q3 Budget Review (t3)
  { id: 'tsk-09', title: 'Finalize Q3 budget',             priority: 'high',   status: 'done',        assignee: dana,                      comments: 3,  topicId: 't3', topicTitle: 'Q3 Budget Review',    projectId: 'product-launch' },
  // Product Launch · Onboarding Revamp (t4)
  { id: 'tsk-10', title: 'Write onboarding copy',          priority: 'medium', status: 'todo',        assignee: alex,                                    topicId: 't4', topicTitle: 'Onboarding Revamp',   projectId: 'product-launch' },
  { id: 'tsk-11', title: 'Design welcome screen',          priority: 'high',   status: 'in-progress', assignee: sam,    dueDate: 'Jun 5',  comments: 2,  topicId: 't4', topicTitle: 'Onboarding Revamp',   projectId: 'product-launch' },
  // Product Launch · Mobile App Beta (t5)
  { id: 'tsk-12', title: 'Set up TestFlight distribution', priority: 'medium', status: 'done',        assignee: river,                     comments: 1,  topicId: 't5', topicTitle: 'Mobile App Beta',     projectId: 'product-launch' },
  { id: 'tsk-13', title: 'Recruit 50 beta testers',        priority: 'medium', status: 'in-progress', assignee: morgan,                                  topicId: 't5', topicTitle: 'Mobile App Beta',     projectId: 'product-launch' },
  // Platform v2 · Platform Architecture (t6)
  { id: 'tsk-14', title: 'Define service boundaries',      priority: 'high',   status: 'in-progress', assignee: alex,   dueDate: 'Jun 3',  comments: 2,  topicId: 't6', topicTitle: 'Platform Architecture', projectId: 'platform-v2' },
  { id: 'tsk-15', title: 'Evaluate message queue options', priority: 'medium', status: 'todo',        assignee: sam,                                     topicId: 't6', topicTitle: 'Platform Architecture', projectId: 'platform-v2' },
  { id: 'tsk-16', title: 'Database sharding strategy',     priority: 'high',   status: 'review',      assignee: jamie,                     comments: 3,  topicId: 't6', topicTitle: 'Platform Architecture', projectId: 'platform-v2' },
  // Platform v2 · API Gateway (t7)
  { id: 'tsk-17', title: 'Implement rate limiting',        priority: 'urgent', status: 'in-progress', assignee: alex,   dueDate: 'May 31', blocked: true, comments: 1, topicId: 't7', topicTitle: 'API Gateway',          projectId: 'platform-v2' },
  { id: 'tsk-18', title: 'Auth middleware spec',           priority: 'high',   status: 'todo',        assignee: sam,                                     topicId: 't7', topicTitle: 'API Gateway',          projectId: 'platform-v2' },
  { id: 'tsk-19', title: 'Write API gateway docs',         priority: 'medium', status: 'todo',        assignee: jamie,                                   topicId: 't7', topicTitle: 'API Gateway',          projectId: 'platform-v2' },
  // Platform v2 · DevOps Pipeline (t8)
  { id: 'tsk-20', title: 'Set up staging environment',     priority: 'high',   status: 'done',        assignee: sam,                       comments: 2,  topicId: 't8', topicTitle: 'DevOps Pipeline',     projectId: 'platform-v2' },
  // Growth · SEO Optimization (t10)
  { id: 'tsk-21', title: 'Keyword research report',        priority: 'medium', status: 'in-progress', assignee: alex,                      comments: 2,  topicId: 't10', topicTitle: 'SEO Optimization',  projectId: 'growth' },
  { id: 'tsk-22', title: 'Fix page speed issues',          priority: 'high',   status: 'todo',        assignee: sam,    dueDate: 'Jun 10',               topicId: 't10', topicTitle: 'SEO Optimization',  projectId: 'growth' },
  // Growth · Referral Program (t11)
  { id: 'tsk-23', title: 'Design referral landing page',   priority: 'medium', status: 'todo',        assignee: morgan,                                  topicId: 't11', topicTitle: 'Referral Program',  projectId: 'growth' },
  { id: 'tsk-24', title: 'Referral reward mechanics doc',  priority: 'medium', status: 'in-progress', assignee: taylor,                                  topicId: 't11', topicTitle: 'Referral Program',  projectId: 'growth' },
  // Customer Onboarding · Onboarding Flow (t12)
  { id: 'tsk-25', title: 'Map current onboarding steps',   priority: 'high',   status: 'done',        assignee: alex,                      comments: 1,  topicId: 't12', topicTitle: 'Onboarding Flow',   projectId: 'onboarding' },
  { id: 'tsk-26', title: 'A/B test welcome email',         priority: 'medium', status: 'in-progress', assignee: sam,    dueDate: 'Jun 7',  comments: 2,  topicId: 't12', topicTitle: 'Onboarding Flow',   projectId: 'onboarding' },
  { id: 'tsk-27', title: 'Reduce setup wizard steps',      priority: 'high',   status: 'todo',        assignee: jamie,                                   topicId: 't12', topicTitle: 'Onboarding Flow',   projectId: 'onboarding' },
  // Customer Onboarding · Help Center Redesign (t13)
  { id: 'tsk-28', title: 'Fix broken help center search',  priority: 'urgent', status: 'in-progress', assignee: morgan, dueDate: 'May 30',               topicId: 't13', topicTitle: 'Help Center Redesign', projectId: 'onboarding' },
  { id: 'tsk-29', title: 'Write 20 new help articles',     priority: 'medium', status: 'todo',        assignee: taylor,                                  topicId: 't13', topicTitle: 'Help Center Redesign', projectId: 'onboarding' },
]

// ── Topics ────────────────────────────────────────────────────────────────────
export const ALL_TOPICS: TopicData[] = [
  {
    id: 't1', projectId: 'product-launch', projectName: 'Product Launch',
    title: 'Rebrand Launch',
    description: 'Complete visual rebrand across all customer-facing touchpoints. New brand guidelines, design system update, and rollout plan.',
    status: 'active', createdBy: alex, createdAt: 'Apr 18',
    members: [alex, sam, jake, dana, max],
    linkedTopics: [
      { id: 't3', title: 'Q3 Budget Review',     relation: 'Shared decision' },
      { id: 't9', title: 'Pricing Page Redesign', relation: 'Related context' },
    ],
    nodes: [
      { type: 'date',    title: 'Launch date: June 15', description: 'Confirmed with engineering that June 15 works if legal comes through on time.', sourceType: 'meet',      sourceLabel: 'Product Sync · Apr 22',         sourceLink: 'Open notes',    createdBy: alex, starred: true },
      { type: 'blocker', title: 'Legal review pending on new logo', description: 'Legal team needs 5 business days to review the updated logo. Hard dependency for June 15.', sourceQuote: "We can't ship the new logo without legal sign-off. They said minimum 5 business days and haven't started yet.", sourceType: 'slack', sourceLabel: '#rebrand · Apr 23, 14:32',          sourceLink: 'Open in Slack', createdBy: jake, myNote: 'Need to ping Sarah about expediting — she knows someone in legal', starred: true },
      { type: 'budget',  title: 'Budget approved: $45k for external agency', description: 'Finance confirmed budget allocation for external design agency.', sourceType: 'docs',      sourceLabel: 'Budget Q3 · Apr 21',            sourceLink: 'Open doc',      createdBy: dana },
      { type: 'fact',    title: 'Competitor X rebranded — 20% traffic lift', description: 'Market data suggests a rebrand can drive measurable traffic growth within 90 days.', sourceType: 'docs',  sourceLabel: 'Research Report · Apr 19',      sourceLink: 'Open doc',      createdBy: max },
    ],
  },
  {
    id: 't2', projectId: 'product-launch', projectName: 'Product Launch',
    title: 'API v3 Migration',
    description: 'Breaking changes for enterprise customers — requires migration guide and advance notice period.',
    status: 'active', createdBy: sam, createdAt: 'Apr 20',
    members: [sam, alex, jamie, morgan],
    nodes: [
      { type: 'date',    title: 'v2 sunset deadline: July 1', description: 'Enterprise clients need API v2 support until July 1 per SLA. No extension possible.', sourceType: 'meet',   sourceLabel: 'Customer Success · Apr 20',   sourceLink: 'Open notes',    createdBy: morgan, starred: true },
      { type: 'blocker', title: 'Two enterprise clients not yet migrated', description: 'Acme Corp and GlobalTech still on v2. They need at least 6 weeks notice before cutover.', sourceType: 'slack',  sourceLabel: '#api-migration · Apr 24',     sourceLink: 'Open in Slack', createdBy: sam, starred: true },
      { type: 'fact',    title: '14 breaking endpoint changes documented', description: 'Engineering completed full audit. 14 endpoints with breaking changes, 6 with deprecations only.', sourceType: 'github', sourceLabel: 'PR #412 · Apr 19',            sourceLink: 'Open PR',       createdBy: jamie },
    ],
  },
  {
    id: 't3', projectId: 'product-launch', projectName: 'Product Launch',
    title: 'Q3 Budget Review',
    description: 'Budget allocation finalized by finance and approved by leadership. Total Q3: $280k.',
    status: 'decided', createdBy: morgan, createdAt: 'Apr 10',
    members: [morgan, dana, alex, taylor],
    linkedTopics: [
      { id: 't1', title: 'Rebrand Launch', relation: 'Shared decision' },
    ],
    nodes: [
      { type: 'budget', title: 'Total Q3 budget approved: $280k', description: 'Approved by CFO Apr 15. Breakdown: $45k external agency, $120k headcount, $115k infrastructure.', sourceType: 'meet',      sourceLabel: 'Finance Meeting · Apr 15',     sourceLink: 'Open notes',  createdBy: morgan, starred: true },
      { type: 'fact',   title: 'Infrastructure costs up 18% vs Q2', description: 'Cloud costs increased due to new region expansion. Expected to stabilize in Q4.', sourceType: 'analytics', sourceLabel: 'AWS Cost Explorer · Apr 10',   sourceLink: 'Open report', createdBy: sam },
    ],
  },
  {
    id: 't4', projectId: 'product-launch', projectName: 'Product Launch',
    title: 'Onboarding Revamp',
    description: 'Reduce time-to-value for new users through an improved first-run flow.',
    status: 'active', createdBy: alex, createdAt: 'Apr 22',
    members: [alex, sam, jamie],
    nodes: [
      { type: 'fact',    title: 'Setup takes 14 min avg — 68% drop-off', description: '68% of drop-offs happen during initial setup. Target: under 5 minutes.', sourceType: 'analytics', sourceLabel: 'Mixpanel · Apr 21',              sourceLink: 'Open dashboard', createdBy: alex, starred: true },
      { type: 'blocker', title: 'No A/B testing framework in place', description: 'Need to instrument the onboarding flow before running experiments. 2 weeks eng effort.', sourceType: 'meet', sourceLabel: 'Eng Standup · Apr 23',           sourceLink: 'Open notes',     createdBy: sam },
    ],
  },
  {
    id: 't5', projectId: 'product-launch', projectName: 'Product Launch',
    title: 'Mobile App Beta',
    description: 'iOS beta launch targeting Q3 — pending TestFlight approval.',
    status: 'active', createdBy: river, createdAt: 'Apr 25',
    members: [river, morgan, alex],
    nodes: [
      { type: 'date', title: 'TestFlight review submitted Apr 26', description: 'Typical review 1–3 business days. Approval expected Apr 29. Beta invites go out same day.', sourceType: 'analytics', sourceLabel: 'App Store Connect · Apr 26', sourceLink: 'Open', createdBy: river, starred: true },
      { type: 'fact', title: '47 beta testers signed up', description: 'Internal team (12) + external waitlist (35). Good coverage across iOS 16 and 17.', sourceType: 'analytics', sourceLabel: 'TestFlight · Apr 25',          sourceLink: 'Open', createdBy: river },
    ],
  },
  {
    id: 't6', projectId: 'platform-v2', projectName: 'Platform v2',
    title: 'Platform Architecture',
    description: 'Core platform redesign for scalability and multi-tenant support.',
    status: 'active', createdBy: alex, createdAt: 'Apr 12',
    members: [alex, sam, jamie, morgan],
    linkedTopics: [
      { id: 't7', title: 'API Gateway', relation: 'Related context' },
    ],
    nodes: [
      { type: 'date',    title: 'Architecture review: May 20', description: 'CTO review of proposed microservices split. Go/no-go decision expected same day.', sourceType: 'meet',  sourceLabel: 'Calendar · Apr 22',           sourceLink: 'Open',        createdBy: alex, starred: true },
      { type: 'fact',    title: 'Monolith: 340k LOC, 18-min deploy', description: 'Baseline before refactor. Target post-refactor: <3 min deploy, independent service scaling.', sourceType: 'docs',  sourceLabel: 'Engineering Audit · Apr 10',  sourceLink: 'Open doc',    createdBy: sam, starred: true },
      { type: 'blocker', title: 'DB connection pool exhaustion at 800 req/s', description: 'Load tests show Postgres becomes bottleneck before the app tier. Sharding decision needed before we proceed.', sourceQuote: 'We hit connection limits at 800 rps in staging. Production peak is already 600. This will fail before launch.', sourceType: 'analytics', sourceLabel: 'Load Test · Apr 18', sourceLink: 'Open report', createdBy: jamie },
    ],
  },
  {
    id: 't7', projectId: 'platform-v2', projectName: 'Platform v2',
    title: 'API Gateway',
    description: 'Unified API gateway with rate limiting, auth middleware, and analytics.',
    status: 'active', createdBy: sam, createdAt: 'Apr 15',
    members: [sam, alex, jamie],
    linkedTopics: [
      { id: 't6', title: 'Platform Architecture', relation: 'Related context' },
    ],
    nodes: [
      { type: 'fact',   title: 'Decision: Kong over AWS API GW', description: 'Kong wins on plugin ecosystem and on-prem flexibility. AWS GW too opinionated for our routing needs.', sourceType: 'notion', sourceLabel: 'Tech Evaluation · Apr 14',   sourceLink: 'Open doc',   createdBy: alex, starred: true },
      { type: 'budget', title: 'Kong Enterprise: $24k/yr approved', description: 'Includes SLA, plugins, and analytics dashboard. Approved within Q3 infra budget.', sourceType: 'meet',   sourceLabel: 'Finance Meeting · Apr 16',  sourceLink: 'Open notes', createdBy: morgan },
    ],
  },
  {
    id: 't8', projectId: 'platform-v2', projectName: 'Platform v2',
    title: 'DevOps Pipeline',
    description: 'CI/CD pipeline with automated testing and zero-downtime deployments.',
    status: 'resolved', createdBy: sam, createdAt: 'Mar 30',
    members: [sam, jamie],
    nodes: [
      { type: 'fact', title: 'GitHub Actions + ArgoCD chosen', description: 'Decision after evaluating Jenkins, CircleCI, and GitHub Actions. ArgoCD handles GitOps deployment.', sourceType: 'notion', sourceLabel: 'ADR-007 · Apr 2',              sourceLink: 'Open doc', createdBy: sam, starred: true },
    ],
  },
  {
    id: 't9', projectId: 'growth', projectName: 'Growth Experiments',
    title: 'Pricing Page Redesign',
    description: 'Updated pricing tiers and comparison table. A/B tested and shipped to production.',
    status: 'resolved', createdBy: alex, createdAt: 'Mar 10',
    members: [alex, river, morgan],
    nodes: [
      { type: 'fact', title: 'A/B test: +22% conversion on new design', description: 'Ran for 14 days, 5,400 visitors per variant. Statistically significant at 95% confidence.', sourceType: 'analytics', sourceLabel: 'Optimizely · Apr 5',             sourceLink: 'Open report', createdBy: alex, starred: true },
    ],
  },
  {
    id: 't10', projectId: 'growth', projectName: 'Growth Experiments',
    title: 'SEO Optimization',
    description: 'Technical SEO improvements targeting 30% organic traffic growth by Q4.',
    status: 'active', createdBy: sam, createdAt: 'Apr 20',
    members: [sam, alex],
    nodes: [
      { type: 'fact',    title: '63 pages with missing meta descriptions', description: 'Crawl identified 63 pages. Priority: product and pricing pages first.', sourceType: 'analytics', sourceLabel: 'Screaming Frog · Apr 19',     sourceLink: 'Open CSV',    createdBy: sam, starred: true },
      { type: 'blocker', title: 'LCP at 4.2s — target is <2.5s', description: 'Product page images not lazy-loaded. Hero image is 2.1MB uncompressed. Failing Core Web Vitals.', sourceType: 'analytics', sourceLabel: 'PageSpeed Insights · Apr 20', sourceLink: 'Open report', createdBy: alex },
    ],
  },
  {
    id: 't11', projectId: 'growth', projectName: 'Growth Experiments',
    title: 'Referral Program',
    description: 'Two-sided referral mechanics with reward tiers and attribution tracking.',
    status: 'active', createdBy: morgan, createdAt: 'Apr 24',
    members: [morgan, taylor, alex],
    nodes: [
      { type: 'fact',   title: 'Dropbox-style referral: 60% of Y1 signups', description: 'Storage reward highly relevant. Double-sided rewards outperform single-sided by 3x.', sourceType: 'notion',    sourceLabel: 'Growth Research · Apr 22',  sourceLink: 'Open doc',   createdBy: morgan, starred: true },
      { type: 'budget', title: 'Reward budget: $8k/month cap approved', description: 'Finance approved $8k/month for referral rewards, reviewed quarterly.', sourceType: 'meet',      sourceLabel: 'Finance Meeting · Apr 25',  sourceLink: 'Open notes', createdBy: taylor },
    ],
  },
  {
    id: 't12', projectId: 'onboarding', projectName: 'Customer Onboarding',
    title: 'Onboarding Flow',
    description: 'Reduce time-to-value for new users through improved first-run experience.',
    status: 'active', createdBy: alex, createdAt: 'Apr 18',
    members: [alex, sam, jamie, morgan],
    linkedTopics: [
      { id: 't13', title: 'Help Center Redesign', relation: 'Related context' },
    ],
    nodes: [
      { type: 'fact',    title: '71% of churned users never completed setup', description: 'Retention analysis: setup completion is the strongest predictor of 30-day retention.', sourceType: 'analytics', sourceLabel: 'Amplitude · Apr 17',             sourceLink: 'Open dashboard', createdBy: alex, starred: true },
      { type: 'blocker', title: '"Workspace" step has 40% drop-off', description: 'Users confused by "workspace" terminology. UX research recommends renaming to "team".', sourceQuote: 'What is a workspace? I thought I was setting up my account. I almost closed the tab.', sourceType: 'meet', sourceLabel: 'User Interview #4 · Apr 16',    sourceLink: 'Open notes',     createdBy: sam, starred: true },
      { type: 'date',    title: 'Redesign target launch: Jun 20', description: 'Aligns with Q3 growth targets. Must be live before the summer conference.', sourceType: 'notion',    sourceLabel: 'Roadmap · Apr 23',              sourceLink: 'Open doc',       createdBy: morgan },
    ],
  },
  {
    id: 't13', projectId: 'onboarding', projectName: 'Customer Onboarding',
    title: 'Help Center Redesign',
    description: 'Restructured help center with better search and improved article organization.',
    status: 'active', createdBy: morgan, createdAt: 'Apr 21',
    members: [morgan, taylor, sam],
    linkedTopics: [
      { id: 't12', title: 'Onboarding Flow', relation: 'Related context' },
    ],
    nodes: [
      { type: 'fact',   title: '34% of visitors use search — 0% find an answer', description: 'Analytics show high search usage but all sessions end without an article view. Search index is broken.', sourceType: 'analytics', sourceLabel: 'Intercom · Apr 20',              sourceLink: 'Open',     createdBy: morgan, starred: true },
      { type: 'budget', title: 'Intercom Articles plan: $199/month approved', description: 'Covers unlimited articles, custom domain, and embedded search widget.', sourceType: 'notion',    sourceLabel: 'SaaS Budget Review · Apr 22',   sourceLink: 'Open doc', createdBy: taylor },
    ],
  },
]

export const TOPIC_MAP: Record<string, TopicData> =
  Object.fromEntries(ALL_TOPICS.map(t => [t.id, t]))
