import { setupWorker, rest } from 'msw';
import { BASE_URL } from './constants';

export const worker = setupWorker(
  rest.get(`${BASE_URL}/literals/mf-remote/:locale`, (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json({}));
  })
);

worker.start({ onUnhandledRequest: 'bypass' });
