//rename file printful js or do in index
import { RequestInit } from 'node-fetch';

import { ErrorHandler } from '../types/functions';

import * as api from '../api';
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
  return {
    catalog: { ...api.getCatalogFunctions(apiFunctions) },
    products: { ...api.getProductsFunctions(apiFunctions) },
    ecommerce: { ...api.getEcommercePlatformSyncFunctions(apiFunctions) },
    productTemplates: { ...api.getProductTemplatesFunctions(apiFunctions) },
    orders: { ...api.getOrdersFunctions(apiFunctions) },
    files: { ...api.getFileLibraryFunctions(apiFunctions) },
    shipping: { ...api.getShippingRateFunctions(apiFunctions) },
    countries: { ...api.getCountryStateCodeFunctions(apiFunctions) },
    taxes: { ...api.getTaxRateFunctions(apiFunctions) },
    webhooks: { ...api.getWebhookFunctions(apiFunctions) },
    store: { ...api.getStoreInformationFunctions(apiFunctions) },
    mockup: { ...api.getMockupGeneratorFunctions(apiFunctions) },
    warehouseProducts: { ...api.getWarehouseProductsFunctions(apiFunctions) },
    reports: { ...api.getReportsFunctions(apiFunctions) },
    approvalSheets: { ...api.getApprovalSheetsFunctions(apiFunctions) },
  };
};

export default printful;
