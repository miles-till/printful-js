/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-return-void */
import { Response } from 'node-fetch';

import { createPromiseDelay, retryPromise, RetryPromiseOptions } from './retry';

export interface RatelimitOptions {
  headerLimit: string;
  headerRemaining: string;
  headerReset: string;
  retryOptions: Partial<RetryPromiseOptions>;
}

const defaultRatelimitOptions: RatelimitOptions = {
  headerLimit: 'x-ratelimit-limit',
  headerRemaining: 'x-ratelimit-remaining',
  headerReset: 'x-ratelimit-reset',
  retryOptions: {
    retryOnSuccess: (response) => {
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        if (retryAfter && !isNaN(+retryAfter)) {
          return +retryAfter;
        }
      }
      return false;
    },
    retries: 5,
  },
};

interface Ratelimit {
  limit: number | null;
  remaining: number | null;
  reset: Date | null;
}

const ratelimit: Ratelimit = {
  limit: null,
  remaining: null,
  reset: null,
};

const updateRatelimit = (
  response: Response,
  options: Readonly<RatelimitOptions>
) => {
  const { headerLimit, headerRemaining, headerReset } = options;

  const ratelimitLimit = response.headers.get(headerLimit);
  const ratelimitRemaining = response.headers.get(headerRemaining);
  const ratelimitReset = response.headers.get(headerReset);

  if (ratelimitLimit && !isNaN(+ratelimitLimit))
    ratelimit.limit = +ratelimitLimit;
  if (ratelimitRemaining && !isNaN(+ratelimitRemaining))
    ratelimit.remaining = +ratelimitRemaining;
  if (ratelimitReset) {
    if (!isNaN(+ratelimitReset))
      ratelimit.reset = new Date(Date.now() + +ratelimitReset);
    else ratelimit.reset = new Date(ratelimitReset);
  }
};

export const ratelimited = async (
  promise: () => Promise<Response>,
  options?: Readonly<Partial<RatelimitOptions>>
) => {
  const _options = { ...defaultRatelimitOptions, ...options };

  if (ratelimit.remaining && ratelimit.remaining <= 0) {
    if (ratelimit.reset) {
      const delayInMs = ratelimit.reset.getTime() - Date.now();
      await createPromiseDelay(delayInMs);
    }
  }

  const response = await retryPromise(promise, _options.retryOptions);
  updateRatelimit(response, _options);
  return response;
};
