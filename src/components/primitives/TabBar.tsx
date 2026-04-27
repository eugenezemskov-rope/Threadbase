import styles from './TabBar.module.css'

interface Tab {
  key: string
  label: string
  count?: number
}

interface TabBarProps {
  tabs: Tab[]
  active: string
  onChange: (key: string) => void
}

export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className={styles.tabBar}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`${styles.tab} ${tab.key === active ? styles.tabActive : ''}`}
          onClick={() => onChange(tab.key)}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span className={`${styles.count} ${tab.key === active ? styles.countActive : ''}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
