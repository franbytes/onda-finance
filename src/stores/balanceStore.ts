import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const BALANCE_KEY = 'onda-balance-storage'
const INITIAL_BALANCE = 24850.75

interface BalanceState {
  balance: number
  deductFromBalance: (amount: number) => void
  resetBalance: () => void
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set) => ({
      balance: INITIAL_BALANCE,
      deductFromBalance: (amount: number) =>
        set((state) => ({ balance: state.balance - amount })),
      resetBalance: () => set({ balance: INITIAL_BALANCE }),
    }),
    { name: BALANCE_KEY },
  ),
)
