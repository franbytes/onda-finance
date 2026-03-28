import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type { BalanceData, ApiResponse } from '@/types'

const BALANCE_QUERY_KEY = ['balance']

async function fetchBalance(): Promise<BalanceData> {
  const response = await api.get<ApiResponse<BalanceData>>('/balance')
  return response.data.data
}

export function useBalance() {
  return useQuery({
    queryKey: BALANCE_QUERY_KEY,
    queryFn: fetchBalance,
  })
}
