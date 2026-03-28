import { motion } from 'framer-motion'

import { TransferForm } from './TransferForm'

export function TransferPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white font-display">
          Transferência
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Envie dinheiro para qualquer lugar do mundo
        </p>
      </motion.div>

      <div className="flex justify-center">
        <TransferForm />
      </div>
    </div>
  )
}
