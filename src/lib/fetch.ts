import _fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';

export type Fetch = (url: RequestInfo, init?: Readonly<RequestInit>) => Promise<Response>;

export const getFetch =
  (baseUrl: string, defaultInit: Readonly<RequestInit>): Fetch =>
  (url, init) =>
    _fetch(`${baseUrl}${url}`, { ...defaultInit, ...init });
