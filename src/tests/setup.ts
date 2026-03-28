import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@/mocks/node';

// MSW Node setup for Vitest
// Note: Handlers are shared with browser worker
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
