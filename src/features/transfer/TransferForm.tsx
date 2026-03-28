import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Loader2, User, DollarSign, FileText } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '@/lib/api'
import { useBalanceStore } from '@/stores/balanceStore'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createTransferSchema, type TransferFormData } from './transferSchema'
import type { TransferPayload } from '@/types'

export function TransferForm() {
  const navigate = useNavigate()
  const balance = useBalanceStore((state) => state.balance)
  const deductFromBalance = useBalanceStore((state) => state.deductFromBalance)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormData>({
    resolver: zodResolver(createTransferSchema(balance)),
    defaultValues: {
      currency: 'BRL',
      description: '',
    },
  })

  const onSubmit = async (data: TransferFormData) => {
    try {
      const payload: TransferPayload = {
        recipient: data.recipient,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
      }

      await api.post('/transfer', payload)
      deductFromBalance(data.amount)

      toast.success('Transferência realizada!', {
        description: `${formatCurrency(data.amount, data.currency)} enviado para ${data.recipient}`,
      })

      navigate('/dashboard')
    } catch {
      toast.error('Erro na transferência', {
        description: 'Tente novamente em instantes.',
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg"
    >
      <div className="relative">
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02]" />

        <div className="relative rounded-3xl bg-[#0E1225]/90 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-display">
              Nova Transferência
            </h2>
            <span className="text-sm text-white/30">
              Saldo: {formatCurrency(balance, 'BRL')}
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor="recipient">Destinatário</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <Input
                  id="recipient"
                  placeholder="Nome do destinatário"
                  className="pl-10"
                  {...register('recipient')}
                />
              </div>
              {errors.recipient && (
                <p className="text-xs text-red-400">{errors.recipient.message}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-10"
                    {...register('amount', { valueAsNumber: true })}
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-red-400">{errors.amount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Moeda</Label>
                <Controller
                  control={control}
                  name="currency"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Moeda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">🇧🇷 BRL</SelectItem>
                        <SelectItem value="USD">🇺🇸 USD</SelectItem>
                        <SelectItem value="USDT">₮ USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.currency && (
                  <p className="text-xs text-red-400">{errors.currency.message}</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="description">
                Descrição{' '}
                <span className="text-white/20">(opcional)</span>
              </Label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <Input
                  id="description"
                  placeholder="Motivo da transferência"
                  className="pl-10"
                  {...register('description')}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 pt-2"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
                id="cancel-transfer"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
                id="submit-transfer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Transferir
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
