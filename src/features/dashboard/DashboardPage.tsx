import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Globe, Shield } from 'lucide-react'

import { BalanceCard } from '@/components/shared/BalanceCard'
import { TransactionList } from '@/components/shared/TransactionList'
import { Button } from '@/components/ui/button'

const FEATURE_CARDS = [
  {
    icon: Zap,
    label: 'Transferências instantâneas',
    color: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: Globe,
    label: 'Pagamentos globais',
    color: 'from-accent-blue/10 to-accent-cyan/10',
    iconColor: 'text-accent-blue',
  },
  {
    icon: Shield,
    label: 'Segurança avançada',
    color: 'from-emerald-500/10 to-teal-500/10',
    iconColor: 'text-emerald-400',
  },
]

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Dashboard</h1>
          <p className="mt-1 text-sm text-white/40">
            Gerencie seus pagamentos globais
          </p>
        </div>
        <Button onClick={() => navigate('/transfer')} id="new-transfer-button">
          Nova Transferência
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <BalanceCard />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 grid gap-3"
          >
            {FEATURE_CARDS.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${card.color}`}
                >
                  <card.icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
                <span className="text-sm text-white/60">{card.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          <TransactionList />
        </div>
      </div>
    </div>
  )
}
