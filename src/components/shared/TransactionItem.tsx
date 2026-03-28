import { motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import type { Transaction } from '@/types'
import { formatCurrency, formatDate, cn } from '@/lib/utils'

const CURRENCY_BADGE_STYLES: Record<string, string> = {
  BRL: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  USD: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  USDT: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
}

interface TransactionItemProps {
  transaction: Transaction
  index: number
}

export function TransactionItem({ transaction, index }: TransactionItemProps) {
  const isInbound = transaction.direction === 'inbound'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors hover:bg-white/[0.03]"
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
            isInbound
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-rose-500/10 text-rose-400',
          )}
        >
          {isInbound ? (
            <ArrowDownLeft className="h-5 w-5" />
          ) : (
            <ArrowUpRight className="h-5 w-5" />
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-white">
            {transaction.counterparty}
          </p>
          <p className="text-xs text-white/30">{transaction.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p
            className={cn(
              'text-sm font-semibold tabular-nums',
              isInbound ? 'text-emerald-400' : 'text-white',
            )}
          >
            {isInbound ? '+' : '-'}{' '}
            {formatCurrency(transaction.amount, transaction.currency)}
          </p>
          <p className="text-xs text-white/25">{formatDate(transaction.date)}</p>
        </div>

        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
            CURRENCY_BADGE_STYLES[transaction.currency],
          )}
        >
          {transaction.currency}
        </span>
      </div>
    </motion.div>
  )
}
