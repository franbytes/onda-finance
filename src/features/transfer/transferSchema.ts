import { z } from 'zod'

const MIN_TRANSFER_AMOUNT = 0.01

export const createTransferSchema = (currentBalance: number) =>
  z.object({
    recipient: z.string().min(1, 'Destinatário é obrigatório'),
    amount: z
      .number()
      .positive('O valor deve ser maior que zero')
      .min(MIN_TRANSFER_AMOUNT, `Valor mínimo: ${MIN_TRANSFER_AMOUNT}`)
      .max(currentBalance, 'Saldo insuficiente'),
    currency: z.enum(['BRL', 'USD', 'USDT']),
    description: z.string().optional(),
  })

export type TransferFormData = z.infer<ReturnType<typeof createTransferSchema>>
