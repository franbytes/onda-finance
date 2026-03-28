import { motion } from 'framer-motion'

import { useTransactions } from '@/hooks/useTransactions'
import { TransactionItem } from './TransactionItem'

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-white/5" />
        <div className="space-y-2">
          <div className="h-3.5 w-28 rounded bg-white/5" />
          <div className="h-2.5 w-20 rounded bg-white/5" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="space-y-2 text-right">
          <div className="h-3.5 w-20 rounded bg-white/5" />
          <div className="h-2.5 w-16 rounded bg-white/5" />
        </div>
        <div className="h-5 w-12 rounded-full bg-white/5" />
      </div>
    </div>
  )
}

const SKELETON_COUNT = 5

export function TransactionList() {
  const { data: transactions, isLoading, isError } = useTransactions()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <h3 className="text-base font-semibold text-white font-display">
          Transações recentes
        </h3>
        <span className="text-xs text-white/30">
          {transactions?.length ?? 0} registros
        </span>
      </div>

      <div className="divide-y divide-white/[0.04] p-2">
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}

        {isError && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-red-400">
              Não foi possível carregar as transações.
            </p>
          </div>
        )}

        {transactions?.map((transaction, index) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            index={index}
          />
        ))}

        {transactions?.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-white/30">Nenhuma transação encontrada.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
