import { Response } from 'node-fetch';

import {
  DefaultErrorResponse,
  EmptyParameters,
  GetEndpoint,
  QueryParameters,
  RequestBody,
  SuccessResponse,
  UrlParameters,
} from '../types/functions';

import type { Fetch } from './fetch';
import { ratelimited } from './ratelimit';

const getQueryString = <P extends QueryParameters>(parameters: P): string => {
  if (parameters === undefined) return '';
  return Object.entries(parameters)
    .map(([key, value]) =>
      value !== undefined
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : ''
    )
    .filter((value) => value !== '')
    .join('&');
};

export const withQueryString = <P extends QueryParameters>(
  endpoint: string,
  parameters: P
) => {
  const qs = getQueryString(parameters);
  return `${endpoint}${qs ? `?${qs}` : ''}`;
};

const makeRequest =
  (fetch: Fetch, method: string) =>
  <
    TResult,
    TUrlParameters extends UrlParameters = EmptyParameters,
    TQueryParameters extends QueryParameters = undefined,
    TRequestBody extends RequestBody = EmptyParameters
  >(
    getEndpoint: GetEndpoint<TUrlParameters>
  ) =>
  async (
    parameters: TUrlParameters & {
      query?: TQueryParameters;
      body?: TRequestBody;
    }
  ) => {
    const urlParams = parameters ?? ({} as TUrlParameters);
    const queryParams = parameters?.query;
    const bodyParams = parameters?.body;
    const endpoint = withQueryString(getEndpoint(urlParams), queryParams ?? {});
    const fetchConfig =
      bodyParams !== undefined
        ? {
            body: JSON.stringify(bodyParams),
            headers: { 'Content-Type': 'application/json' },
          }
        : {};

    return getProcessedResponse<SuccessResponse<TResult>>(() =>
      fetch(endpoint, {
        method: method,
        ...fetchConfig,
      })
    );
  };

const getSyntheticError = (e: Error): DefaultErrorResponse => ({
  code: 444,
  result: e.message,
  error: {
    name: e.name,
    message: e.message,
    stack: e.stack,
  } as Record<string, string>,
});

const defaultErrorHandler = (e: unknown): DefaultErrorResponse => {
  const error =
    Object.prototype.toString.call(e) === '[object Error]'
      ? (e as Error)
      : new Error('Synthetic Error');
  return getSyntheticError(error);
};

export const getProcessedResponse = async <R>(
  fetch: () => Promise<Response>
) => {
  try {
    return await ratelimited(fetch)
      .then((response) => {
        return response.json() as unknown as R;
      })
      .catch((e: Error) => {
        return getSyntheticError(e) as DefaultErrorResponse;
      });
  } catch (e: unknown) {
    return defaultErrorHandler(e) as DefaultErrorResponse;
  }
};

export const asOptionalArgs =
  <R>(func: (args: Record<string, unknown>) => R) =>
  (parameters = {}) =>
    func(parameters);

export const getAPIFunctions = (fetch: Fetch) => ({
  get: makeRequest(fetch, 'GET'),
  create: makeRequest(fetch, 'POST'),
  update: makeRequest(fetch, 'PUT'),
  del: makeRequest(fetch, 'DELETE'),
});
