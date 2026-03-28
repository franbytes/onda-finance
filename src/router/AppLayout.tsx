import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { Header } from '@/components/shared/Header'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
