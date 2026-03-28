export type Currency = 'BRL' | 'USD' | 'USDT'

export type TransactionDirection = 'inbound' | 'outbound'

export interface Transaction {
  id: string
  direction: TransactionDirection
  counterparty: string
  amount: number
  currency: Currency
  description: string
  date: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface TransferPayload {
  recipient: string
  amount: number
  currency: Currency
  description?: string
}

export interface BalanceData {
  amount: number
  currency: Currency
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface ApiResponse<T> {
  data: T
  message: string
}
