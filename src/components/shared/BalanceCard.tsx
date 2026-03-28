import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Eye, EyeOff, TrendingUp } from 'lucide-react'

import { useBalanceStore } from '@/stores/balanceStore'
import { formatCurrency } from '@/lib/utils'

function AnimatedCounter({ value }: { value: number }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) =>
    formatCurrency(latest, 'BRL'),
  )
  const [displayValue, setDisplayValue] = useState(formatCurrency(0, 'BRL'))

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: 'easeOut',
    })

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value, motionValue, rounded])

  return <span>{displayValue}</span>
}

export function BalanceCard() {
  const balance = useBalanceStore((state) => state.balance)
  const [isVisible, setIsVisible] = useState(true)

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-cyan/5" />
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent-cyan/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10">
              <TrendingUp className="h-4 w-4 text-accent-blue" />
            </div>
            <span className="text-sm font-medium text-white/50">Saldo disponível</span>
          </div>
          <button
            onClick={toggleVisibility}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/70 cursor-pointer"
            id="toggle-balance"
            aria-label={isVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
          >
            {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>

        <div className="mb-2">
          {isVisible ? (
            <h2 className="text-4xl font-bold text-white font-display tracking-tight">
              <AnimatedCounter value={balance} />
            </h2>
          ) : (
            <h2 className="text-4xl font-bold text-white font-display tracking-tight">
              •••••••
            </h2>
          )}
        </div>

        <p className="text-sm text-white/30">Conta principal · BRL</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
    </motion.div>
  )
}
