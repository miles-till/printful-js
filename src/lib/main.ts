//rename file printful js or do in index
import { RequestInit } from 'node-fetch';

import { ErrorHandler } from '../types/functions';

import { getApi } from '../api';
import { getFetch } from './fetch';
import { getAPIFunctions } from './functions';

const DEFAULT_BASE_URL = 'https://api.printful.com';

const getDefaultInit = (apiKey: string) => ({
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

type Options = {
  readonly baseUrl?: string;
  readonly apiKey: string;
  readonly fetchConfig?: RequestInit;
  readonly handleError?: ErrorHandler;
};

const printful = ({
  baseUrl = DEFAULT_BASE_URL,
  apiKey,
  fetchConfig = {},
}: // handleError = defaultHandleError,
Options) => {
  const requestInit = getDefaultInit(apiKey);
  const fetch = getFetch(baseUrl, { ...requestInit, ...fetchConfig });
  const apiFunctions = getAPIFunctions(fetch);
  return getApi(apiFunctions);
};

export default printful;
