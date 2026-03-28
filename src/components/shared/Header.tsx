import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Waves, LayoutDashboard, ArrowLeftRight } from 'lucide-react'

import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transfer', label: 'Transferência', icon: ArrowLeftRight },
]

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0E1A]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-cyan shadow-lg shadow-accent-blue/20">
            <Waves className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-display">
            onda<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">.finance</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-white/50 hover:text-white hover:bg-white/5',
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-white/40">
            {user?.name}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} id="logout-button">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
