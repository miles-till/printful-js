import { Response } from 'node-fetch';

import {
  APIResponse,
  DefaultErrorResponse,
  GetEndpoint,
  GETParameters,
  Paging,
  POSTParameters,
  PUTParameters,
  ResolveParameters,
  Result,
  SuccessResponse,
  URLParameters,
} from '../types/functions';

import { Fetch } from './fetch';
import { ratelimited } from './ratelimit';

const getQueryString = <P extends GETParameters>(parameters: P): string =>
  Object.entries(parameters)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

export const withQueryString = <P extends GETParameters>(
  endpoint: string,
  parameters: P
) => {
  const qs = getQueryString(parameters);
  return `${endpoint}${qs ? `?${qs}` : ''}`;
};

export const makeGet =
  (fetch: Fetch) =>
  <R extends Result, U extends URLParameters>(getEndpoint: GetEndpoint<U>) =>
  async (URLParameters: U) => {
    return getProcessedResponse<SuccessResponse<R>>(() =>
      fetch(getEndpoint(URLParameters), {
        method: 'GET',
      })
    );
  };

//list does not need URL and GET parameters, its the same really.
export const makeList =
  (fetch: Fetch) =>
  <R extends Result, U extends URLParameters, P extends GETParameters>(
    getEndpoint: GetEndpoint<U>,
    getParameters: (parameters: U & P) => readonly [U, P]
  ) =>
  async (parameters: U & P) => {
    const [URLParameters, queryParams] = getParameters(parameters);
    const qs = getQueryString(queryParams);
    return getProcessedResponse<
      SuccessResponse<R> & { readonly paging: Paging }
    >(() =>
      fetch(`${getEndpoint(URLParameters)}${qs ? `?${qs}` : ''}`, {
        method: 'GET',
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

export const makeCreate =
  (fetch: Fetch) =>
  <R extends Result, U extends URLParameters, P extends POSTParameters>(
    getEndpoint: GetEndpoint<U>,
    getParameters: ResolveParameters<U, P>
  ) =>
  async (parameters: U & P) => {
    const [URLParameters, postParameters] = getParameters(parameters);
    return getProcessedResponse<APIResponse<R>>(() =>
      fetch(getEndpoint(URLParameters), {
        method: 'POST',
        ...postParameters,
      })
    );
  };

export const makeUpdate =
  (fetch: Fetch) =>
  <R extends Result, U extends URLParameters, P extends PUTParameters>(
    getEndpoint: GetEndpoint<U>,
    getParameters: ResolveParameters<U, P>
  ) =>
  async (parameters: U & P) => {
    const [URLParameters, putParameters] = getParameters(parameters);
    return getProcessedResponse<APIResponse<R>>(() =>
      fetch(getEndpoint(URLParameters), {
        method: 'PUT',
        ...putParameters,
      })
    );
  };

export const makeDelete =
  (fetch: Fetch) =>
  <R extends Result, U extends URLParameters>(getEndpoint: GetEndpoint<U>) =>
  async (URLParameters: U) => {
    return getProcessedResponse<APIResponse<R>>(() =>
      fetch(getEndpoint(URLParameters), {
        method: 'DELETE',
      })
    );
  };
export const asOptionalArgs =
  <R>(func: (args: Record<string, unknown>) => R) =>
  (parameters = {}) =>
    func(parameters);

export const getAPIFunctions = (fetch: Fetch) => ({
  get: makeGet(fetch),
  list: makeList(fetch),
  create: makeCreate(fetch),
  update: makeUpdate(fetch),
  del: makeDelete(fetch),
});
