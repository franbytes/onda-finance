<div align="center">
  <a href="#portuguese">🇧🇷 Português</a> &nbsp;|&nbsp; <a href="#english">🇺🇸 English</a>
</div>

<a name="portuguese"></a>

# 🌊 Onda Finance

Uma aplicação bancária moderna e poderosa para transferências globais, suportando tanto moedas fiduciárias (BRL, USD) quanto cripto (USDT).

https://onda-finance-one.vercel.app/

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
npm run test
```

### Build
```bash
npm run build
```

### Credenciais mock
- **Email:** `user@onda.finance`
- **Senha:** Qualquer valor com 6+ caracteres (ex: `123456`)

---

## 🛠 Decisões técnicas adotadas

### Stack e Justificativas
- **MSW (Mock Service Worker):** Adotado para simular chamadas de rede reais durante o desenvolvimento. Isso permite que a aplicação seja construída de forma agnóstica ao backend, facilitando a transição para uma API real sem alterar a lógica de consumo de dados.
- **Zustand + Persist:** Gerenciamento de estado leve e escalável. A persistência é usada para manter a sessão do usuário e o saldo após recarregar a página, garantindo uma experiência de usuário fluida.
- **React Query (TanStack Query):** Gerencia o cache e a sincronização de dados assíncronos. É essencial para manter a lista de transações atualizada e lidar com estados de carregamento e erro de forma declarativa.
- **CVA (Class Variance Authority):** Utilizado para gerenciar variantes de componentes de UI de forma tipada e consistente, integrando-se perfeitamente com o Tailwind CSS v4.
- **Zod (Schema-First):** Centraliza a lógica de validação. Os schemas do Zod são a fonte única de verdade para a validação de formulários e para a tipagem dos dados em toda a aplicação.

### Arquitetura
A aplicação segue uma **arquitetura baseada em features** (`src/features/`), onde cada domínio (Autenticação, Dashboard, Transferências) é isolado. Isso garante escalabilidade, facilita a manutenção e permite que a equipe cresça sem gerar conflitos de código excessivos.

### MSW em Produção
O MSW é explicitamente desabilitado em modo de produção (controlado em `main.tsx`). Isso garante que a aplicação final se comunique apenas com endpoints de produção reais, evitando que dados mockados sejam expostos aos usuários finais.

---

## 🔮 Melhorias futuras

- **Integração com API real:** Processamento real de pagamentos via Pix (Brasil), SWIFT (Internacional) e pontes de criptografia.
- **Autenticação avançada:** Implementação de JWT com refresh token armazenado em `httpOnly cookie` para maior segurança.
- **Gestão de Histórico:** Histórico de transações avançado com filtros de data, paginação e exportação para CSV/PDF.
- **Múltiplas Carteiras:** Suporte nativo para contas separadas em BRL, USD e USDT com conversão em tempo real.
- **i18n:** Suporte completo a múltiplos idiomas (Português, Inglês, Espanhol).
- **Notificações:** Alertas em tempo real sobre transações e segurança via WebSockets.
- **Segurança Extra:** Implementação de 2FA (Autenticação de dois fatores).
- **PWA:** Transformar a aplicação em um Progressive Web App para instalação em dispositivos móveis.
- **Testes E2E:** Implementação de testes de ponta a ponta com Playwright.

---

## 🛡 Segurança (obrigatório)

### Engenharia Reversa e Proteção de Código
- **Minificação + Ofuscação:** O build de produção utiliza o `vite-plugin-javascript-obfuscator` para ofuscar a lógica de negócio, protegendo a propriedade intelectual contra engenharia reversa básica.
- **Sourcemaps:** Desabilitados em produção (`sourcemap: false`) para evitar que o código fonte original seja exposto através das ferramentas de desenvolvedor do navegador.
- **Variáveis de Ambiente:** Configurações sensíveis são geridas exclusivamente via arquivos `.env` e nunca versionadas no repositório.

### Proteção de Dados e XSS
- **Vazamento de dados:** Em um ambiente real, todos os tokens de sessão devem ser armazenados em `httpOnly cookies`, nunca em `localStorage`, para mitigar ataques de sequestro de sessão.
- **Headers de Segurança:** Recomendamos a implementação de headers como `Content-Security-Policy` (CSP) e `X-Frame-Options` no servidor de deploy.
- **HTTPS:** Obrigatório em todos os ambientes de produção para garantir criptografia em trânsito.
- **Sanitização:** Validação rigorosa de todos os inputs via Zod e proteção nativa do React contra injeções XSS.

<br />
<hr />
<br />

<a name="english"></a>

# 🌊 Onda Finance

A powerful and modern banking application for global transfers, supporting both fiat (BRL, USD) and crypto (USDT) currencies.

## 🚀 How to run the project

### Prerequisites
- Node.js >= 18
- npm or pnpm

### Installation
```bash
git clone https://github.com/franbytes/onda-finance
cd onda-finance
npm install
```

### Development
```bash
npm run dev
```

### Tests
```bash
npm run test
```

### Build
```bash
npm run build
```

### Mock credentials
- **Email:** `user@onda.finance`
- **Password:** Any value with 6+ characters (e.g., `123456`)

---

## 🛠 Technical decisions

### Stack and Justifications
- **MSW (Mock Service Worker):** Adopted to simulate real network calls during development. This allows the application to be built backend-agnostic, making the transition to a real API trivial without changing the data consumption logic.
- **Zustand + Persist:** Lightweight and scalable state management. Persistence is used to keep the user session and balance after page reloads, ensuring a fluid user experience.
- **React Query (TanStack Query):** Manages asynchronous data synchronization and caching. It is essential for keeping the transaction list updated and handling loading and error states declaratively.
- **CVA (Class Variance Authority):** Used to manage UI component variants in a type-safe and consistent way, integrating perfectly with Tailwind CSS v4.
- **Zod (Schema-First):** Centralizes validation logic. Zod schemas are the single source of truth for form validation and data typing throughout the application.

### Architecture
The application follows a **feature-based architecture** (`src/features/`), where each domain (Authentication, Dashboard, Transfers) is isolated. This ensures scalability, facilitates maintenance, and allows the team to grow without excessive code conflicts.

### MSW in Production
MSW is explicitly disabled in production mode (controlled in `main.tsx`). This ensures that the final application communicates only with real production endpoints, avoiding the risk of mock data being exposed to end users.

---

## 🔮 Future improvements

- **Real API Integration:** Real payment processing via Pix (Brazil), SWIFT (International), and crypto bridges.
- **Advanced Authentication:** JWT implementation with refresh tokens stored in `httpOnly cookies` for enhanced security.
- **History Management:** Advanced transaction history with date filters, pagination, and CSV/PDF export.
- **Multiple Wallets:** Native support for separate BRL, USD, and USDT accounts with real-time conversion.
- **i18n:** Full support for multiple languages (English, Portuguese, Spanish).
- **Notifications:** Real-time alerts on transactions and security via WebSockets.
- **Extra Security:** 2FA (Two-Factor Authentication) implementation.
- **PWA:** Transforming the application into a Progressive Web App for mobile installation.
- **E2E Tests:** Implementation of end-to-end tests with Playwright.

---

## 🛡 Security (required)

### Reverse Engineering and Code Protection
- **Minification + Obfuscation:** The production build uses `vite-plugin-javascript-obfuscator` to obfuscate business logic, protecting intellectual property against basic reverse engineering.
- **Sourcemaps:** Disabled in production (`sourcemap: false`) to prevent the original source code from being exposed through browser developer tools.
- **Environment Variables:** Sensitive configurations are managed exclusively via `.env` files and never versioned in the repository.

### Data Protection and XSS
- **Data leakage:** In a real-world environment, all session tokens should be stored in `httpOnly cookies`, never in `localStorage`, to mitigate session hijacking attacks.
- **Security Headers:** We recommend implementing headers such as `Content-Security-Policy` (CSP) and `X-Frame-Options` on the deployment server.
- **HTTPS:** Mandatory in all production environments to ensure encryption in transit.
- **Sanitization:** Strict validation of all inputs via Zod and React's native protection against XSS injections.
