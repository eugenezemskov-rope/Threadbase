import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SelectDropdown.module.css'

export interface SelectOption {
  value: string
  label: string
  color?: string
  isAI?: boolean
}

interface SelectDropdownProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export function SelectDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select…',
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <span className={styles.triggerContent}>
          {selected ? (
            <>
              {selected.isAI ? (
                <Sparkles size={10} strokeWidth={1.5} className={styles.aiIcon} />
              ) : (
                <span
                  className={styles.dot}
                  style={{ background: selected.color ?? 'var(--text-tertiary)' }}
                />
              )}
              <span className={styles.triggerLabel}>{selected.label}</span>
            </>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {options.map(opt => {
              const isSelected = opt.value === value
              return (
                <button
                  key={opt.value}
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => { onChange?.(opt.value); setOpen(false) }}
                >
                  <span className={styles.optionLeft}>
                    {opt.isAI ? (
                      <Sparkles size={10} strokeWidth={1.5} className={styles.aiIcon} />
                    ) : (
                      <span
                        className={styles.dot}
                        style={{ background: opt.color ?? 'var(--text-tertiary)' }}
                      />
                    )}
                    <span className={`${styles.optionLabel} ${isSelected ? styles.optionLabelSelected : ''}`}>
                      {opt.label}
                    </span>
                  </span>
                  {isSelected && (
                    <Check size={11} strokeWidth={2} className={styles.checkmark} />
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
