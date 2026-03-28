import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type { Transaction, ApiResponse } from '@/types'

const TRANSACTIONS_QUERY_KEY = ['transactions']

async function fetchTransactions(): Promise<Transaction[]> {
  const response = await api.get<ApiResponse<Transaction[]>>('/transactions')
  return response.data.data
}

export function useTransactions() {
  return useQuery({
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: fetchTransactions,
  })
}
