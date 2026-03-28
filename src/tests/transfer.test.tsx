import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'

import { TransferForm } from '@/features/transfer/TransferForm'
import { useBalanceStore } from '@/stores/balanceStore'

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('TransferForm', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNavigate as any).mockReturnValue(mockNavigate)
    useBalanceStore.getState().resetBalance()
  })

  const renderForm = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <TransferForm />
        </MemoryRouter>
      </QueryClientProvider>
    )

  it('renderiza o formulário de transferência corretamente', () => {
    renderForm()
    expect(screen.getByText(/Nova Transferência/i)).toBeDefined()
    expect(screen.getByLabelText(/Destinatário/i)).toBeDefined()
    expect(screen.getByLabelText(/Valor/i)).toBeDefined()
  })

  it('exibe erro ao submeter com valor 0', async () => {
    renderForm()
    const user = userEvent.setup()
    
    await user.type(screen.getByLabelText(/Destinatário/i), 'Carlos')
    await user.type(screen.getByLabelText(/Valor/i), '0')
    await user.click(screen.getByRole('button', { name: /Transferir/i }))

    await waitFor(() => {
      expect(screen.getByText(/O valor deve ser maior que zero/i)).toBeDefined()
    })
  })

  it('exibe erro ao submeter com valor maior que o saldo', async () => {
    renderForm()
    const user = userEvent.setup()
    const currentBalance = useBalanceStore.getState().balance
    
    await user.type(screen.getByLabelText(/Destinatário/i), 'Carlos')
    await user.type(screen.getByLabelText(/Valor/i), (currentBalance + 100).toString())
    await user.click(screen.getByRole('button', { name: /Transferir/i }))

    await waitFor(() => {
      expect(screen.getByText(/Saldo insuficiente/i)).toBeDefined()
    })
  })

  it('submete com dados válidos e deduz do saldo', async () => {
    const deductSpy = vi.spyOn(useBalanceStore.getState(), 'deductFromBalance')
    renderForm()
    const user = userEvent.setup()
    
    await user.type(screen.getByLabelText(/Destinatário/i), 'Carlos')
    await user.type(screen.getByLabelText(/Valor/i), '500')
    await user.click(screen.getByRole('button', { name: /Transferir/i }))

    await waitFor(() => {
      expect(deductSpy).toHaveBeenCalledWith(500)
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })
})
