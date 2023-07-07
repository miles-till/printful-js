/* eslint-disable functional/no-loop-statements */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-mixed-types */
import { Response } from 'node-fetch';

export interface RetryPromiseOptions {
  retryOnSuccess: (response: Response) => boolean | number;
  retries: number;
}

const defaultRetryPromiseOptions: RetryPromiseOptions = {
  retryOnSuccess: () => false,
  retries: 1,
};

export const createPromiseDelay = (delayInMs: number) =>
  new Promise((resolve) => setTimeout(() => resolve, delayInMs));

export const retryPromise = async (
  promise: () => Promise<Response>,
  options?: Readonly<Partial<RetryPromiseOptions>>
) => {
  const _options = { ...defaultRetryPromiseOptions, ...options };
  const { retryOnSuccess: retryOnSuccess, retries } = _options;
  let response = await promise();

  for (let i = 0; i < retries; i++) {
    const retry = retryOnSuccess(response);
    if (retry) {
      if (typeof retry === 'number') {
        await createPromiseDelay(retry * 1000);
      }
      response = await promise();
    } else break;
  }

  return response;
};
