# 🌊 Onda Finance

A simple yet powerful banking application for global payments, supporting crypto (USDT) and fiat (BRL, USD) transfers.

![Onda Finance Preview](https://github.com/franbytes/onda-finance/raw/main/preview.png)

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js >= 18
- npm ou pnpm

### Instalação
```bash
git clone https://github.com/franbytes/onda-finance
cd onda-finance
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Testes
```bash
npm test
```

### Build
```bash
npm run build
```

### Credenciais mock
- **Email:** `user@onda.finance`
- **Senha:** `123456` (ou qualquer valor com 6+ caracteres)

---

## 🛠 Decisões Técnicas

### Stack Justification
- **Vite + React + TypeScript:** Standard industry stack for performance, developer experience, and type safety.
- **MSW (Mock Service Worker):** Simulates real HTTP calls at the network level, making the transition to a real backend trivial while allowing realistic error/loading handling during development.
- **Zustand + Persist:** Lightweight state management with built-in persistence for auth session and balance, surviving page reloads without the boilerplate of Redux or the complexity of Context.
- **React Query (TanStack Query):** Handles asynchronous state synchronization, caching, and automatic UI updates for transactions.
- **Tailwind CSS v4 + CVA:** Utility-first styling with type-safe component variants (Class Variance Authority) for a robust design system.
- **shadcn/ui + Radix UI:** Accessible, unstyled primitives used as a foundation for high-quality, customized UI components.
- **Zod Schema-First Validation:** Centralizes validation logic for both forms and TypeScript types, ensuring data integrity.

### Architecture
The project follows a **Feature-based architecture** (`features/`), separating logic by domain (Auth, Dashboard, Transfer). This ensures scalability and clear ownership of code as the application grows.

---

## 🔮 Melhorias Futuras
- **Integração com API Real:** Connect to banking providers (Pix, SWIFT) and crypto bridges.
- **Enhanced Security:** Move sensitive tokens to `httpOnly` cookies with refresh token rotation.
- **Advanced History:** Filters, pagination, and CSV/PDF export for transactions.
- **Multi-Wallet:** Separate balances for BRL, USD, and USDT.
- **i18n:** Support for English, Portuguese, and Spanish.
- **Real-time:** WebSockets for live transaction notifications.
- **PWA:** Installable mobile experience.

---

## 🛡 Segurança

### Engenharia Reversa & Data Secrecy
- **Minification & Obfuscation:** Production build is optimized and minified. For sensitive logic, `sourcemaps` are disabled.
- **Environment Variables:** All sensitive configurations (API keys) are managed via `.env` files and never committed.
- **HTTPS Required:** Enforced in production to prevent Man-in-the-Middle attacks.

### Vazamento de Dados & XSS
- **Input Sanitization:** React's automatic escaping combined with Zod validation prevents XSS.
- **Storage:** Sensitive data is moved from `localStorage` to memory or secured storage in real implementations.
- **Security Headers:** Recommended deployment with CSP (Content Security Policy) and HSTS.

---

## ✅ Critérios de Entrega
- [x] Login Funcional (Zod/MSW)
- [x] Dashboard com Balance (Counter Animado)
- [x] Lista de Transações (React Query)
- [x] Formulário de Transferência (Zod validation + Store deduction)
- [x] Testes de Integração (Vitest)
- [x] Design Premium & Responsivo (Dark Mode)
