/* ThreadBase Design Tokens — TypeScript
   Use in JS/TSX where CSS vars aren't accessible (e.g. Framer Motion values) */

export const colors = {
  brand: {
    primary:     '#C5E846',
    primaryHover:'#D4F25A',
    primaryMuted:'rgba(197, 232, 70, 0.12)',
    primaryText: '#0A0A0A',
  },
  bg: {
    base:      '#111111',
    primary:   '#1C1C1E',
    secondary: '#242426',
    elevated:  '#2C2C2E',
    overlay:   '#323234',
    sidebar:   '#161618',
  },
  border: {
    subtle:  'rgba(255, 255, 255, 0.05)',
    default: 'rgba(255, 255, 255, 0.09)',
    strong:  'rgba(255, 255, 255, 0.16)',
  },
  text: {
    primary:   '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.58)',
    tertiary:  'rgba(255, 255, 255, 0.34)',
    disabled:  'rgba(255, 255, 255, 0.20)',
    inverse:   '#0A0A0A',
  },
  blue:   { base: '#0A84FF', muted: 'rgba(10, 132, 255, 0.14)', border: 'rgba(10, 132, 255, 0.28)' },
  green:  { base: '#30D158', muted: 'rgba(48, 209, 88, 0.14)',  border: 'rgba(48, 209, 88, 0.28)' },
  red:    { base: '#FF453A', muted: 'rgba(255, 69, 58, 0.14)',  border: 'rgba(255, 69, 58, 0.28)' },
  orange: { base: '#FF9F0A', muted: 'rgba(255, 159, 10, 0.14)', border: 'rgba(255, 159, 10, 0.28)' },
  yellow: { base: '#FFD60A', muted: 'rgba(255, 214, 10, 0.14)' },
  purple: { base: '#BF5AF2', muted: 'rgba(191, 90, 242, 0.14)', border: 'rgba(191, 90, 242, 0.28)' },
  teal:   { base: '#40CBE0', muted: 'rgba(64, 203, 224, 0.14)' },
} as const

export const nodeTypeColors = {
  date:    colors.blue,
  blocker: colors.red,
  budget:  colors.green,
  fact:    colors.orange,
} as const

export const sourceTypeColors = {
  call:  colors.teal,
  slack: colors.purple,
  doc:   { base: colors.text.secondary, muted: 'rgba(255, 255, 255, 0.06)' },
} as const

export const typography = {
  fontHeading: "'Neue Machina', system-ui, sans-serif",
  fontBody:    "'Intel One Mono', 'Courier New', monospace",
  size: {
    xs:   '10px',
    sm:   '11px',
    base: '12px',
    md:   '13px',
    lg:   '15px',
    xl:   '18px',
    '2xl':'24px',
    '3xl':'32px',
  },
  weight: {
    regular:  400,
    medium:   500,
    semibold: 700,
    bold:     800,
  },
} as const

export const spacing = {
  xs:  '4px',
  sm:  '8px',
  md:  '12px',
  lg:  '16px',
  xl:  '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
  '6xl': '64px',
} as const

export const radius = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  pill: '9999px',
} as const

export const layout = {
  sidebarWidth:    240,
  triageWidth:     420,
  rightPanelWidth: 320,
  headerHeight:    56,
} as const

export const motion = {
  ease:     [0.16, 1, 0.3, 1] as [number, number, number, number],
  fast:     0.12,
  normal:   0.20,
  slow:     0.32,
} as const
