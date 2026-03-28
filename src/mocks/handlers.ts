import { http, HttpResponse, delay } from 'msw'

import type { Transaction, TransferPayload } from '@/types'

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    direction: 'inbound',
    counterparty: 'Carlos Mendonça',
    amount: 3200.0,
    currency: 'BRL',
    description: 'Pagamento freelance',
    date: '2026-03-27T14:30:00Z',
  },
  {
    id: '2',
    direction: 'outbound',
    counterparty: 'Stripe Inc.',
    amount: 450.0,
    currency: 'USD',
    description: 'SaaS subscription',
    date: '2026-03-26T10:15:00Z',
  },
  {
    id: '3',
    direction: 'inbound',
    counterparty: 'DeFi Yield',
    amount: 1250.5,
    currency: 'USDT',
    description: 'Yield farming reward',
    date: '2026-03-25T08:45:00Z',
  },
  {
    id: '4',
    direction: 'outbound',
    counterparty: 'Maria Silva',
    amount: 780.0,
    currency: 'BRL',
    description: 'Aluguel escritório',
    date: '2026-03-24T16:20:00Z',
  },
  {
    id: '5',
    direction: 'inbound',
    counterparty: 'Binance',
    amount: 2100.0,
    currency: 'USDT',
    description: 'Crypto trade profit',
    date: '2026-03-23T12:00:00Z',
  },
  {
    id: '6',
    direction: 'outbound',
    counterparty: 'AWS',
    amount: 320.0,
    currency: 'USD',
    description: 'Cloud infrastructure',
    date: '2026-03-22T09:30:00Z',
  },
  {
    id: '7',
    direction: 'inbound',
    counterparty: 'João Pereira',
    amount: 5600.0,
    currency: 'BRL',
    description: 'Consultoria técnica',
    date: '2026-03-21T11:10:00Z',
  },
  {
    id: '8',
    direction: 'outbound',
    counterparty: 'Revolut',
    amount: 150.0,
    currency: 'USD',
    description: 'International transfer',
    date: '2026-03-20T15:45:00Z',
  },
]

let dynamicTransactions: Transaction[] = [...MOCK_TRANSACTIONS]

export const handlers = [
  http.get('/api/transactions', async () => {
    await delay(800)
    return HttpResponse.json({
      data: dynamicTransactions,
      message: 'Transactions fetched successfully',
    })
  }),

  http.get('/api/balance', async () => {
    await delay(500)
    return HttpResponse.json({
      data: { amount: 24850.75, currency: 'BRL' },
      message: 'Balance fetched successfully',
    })
  }),

  http.post('/api/transfer', async ({ request }) => {
    await delay(1000)
    const body = (await request.json()) as TransferPayload

    const newTransaction: Transaction = {
      id: String(dynamicTransactions.length + 1),
      direction: 'outbound',
      counterparty: body.recipient,
      amount: body.amount,
      currency: body.currency,
      description: body.description ?? '',
      date: new Date().toISOString(),
    }

    dynamicTransactions = [newTransaction, ...dynamicTransactions]

    return HttpResponse.json({
      data: newTransaction,
      message: 'Transfer completed successfully',
    })
  }),

  http.post('/api/auth/login', async ({ request }) => {
    await delay(600)
    const body = (await request.json()) as { email: string; password: string }

    if (body.email === 'user@onda.finance' && body.password.length >= 6) {
      return HttpResponse.json({
        data: {
          id: '1',
          name: 'Fransley Araújo',
          email: 'user@onda.finance',
        },
        message: 'Login successful',
      })
    }

    return HttpResponse.json(
      { data: null, message: 'Invalid credentials' },
      { status: 401 },
    )
  }),
]
