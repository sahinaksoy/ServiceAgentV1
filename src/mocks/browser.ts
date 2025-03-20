import { setupWorker } from 'msw/browser';
import { workOrderReportHandlers } from './handlers/workOrderReport';
import { handlers } from './handlers';

export const worker = setupWorker(...workOrderReportHandlers, ...handlers);

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
} 