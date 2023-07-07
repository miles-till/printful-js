import type { APIFunctions } from '../types/functions';

import { getApprovalSheetsFunctions } from './approvalSheets';
import { getCatalogFunctions } from './catalog';
import { getCountryStateCodeFunctions } from './countryStateCode';
import { getEcommercePlatformSyncFunctions } from './ecommercePlatformSync';
import { getFileLibraryFunctions } from './fileLibrary';
import { getMockupGeneratorFunctions } from './mockupGenerator';
import { getOrdersFunctions } from './orders';
import { getProductTemplatesFunctions } from './productTemplates';
import { getProductsFunctions } from './products';
import { getReportsFunctions } from './reports';
import { getShippingRateFunctions } from './shippingRate';
import { getStoreInformationFunctions } from './storeInformation';
import { getTaxRateFunctions } from './taxRate';
import { getWarehouseProductsFunctions } from './warehouseProducts';
import { getWebhookFunctions } from './webhook';

export const getApi = (apiFunctions: Readonly<APIFunctions>) => ({
  catalog: { ...getCatalogFunctions(apiFunctions) },
  products: { ...getProductsFunctions(apiFunctions) },
  ecommerce: { ...getEcommercePlatformSyncFunctions(apiFunctions) },
  productTemplates: { ...getProductTemplatesFunctions(apiFunctions) },
  orders: { ...getOrdersFunctions(apiFunctions) },
  files: { ...getFileLibraryFunctions(apiFunctions) },
  shipping: { ...getShippingRateFunctions(apiFunctions) },
  countries: { ...getCountryStateCodeFunctions(apiFunctions) },
  taxes: { ...getTaxRateFunctions(apiFunctions) },
  webhooks: { ...getWebhookFunctions(apiFunctions) },
  store: { ...getStoreInformationFunctions(apiFunctions) },
  mockup: { ...getMockupGeneratorFunctions(apiFunctions) },
  warehouseProducts: { ...getWarehouseProductsFunctions(apiFunctions) },
  reports: { ...getReportsFunctions(apiFunctions) },
  approvalSheets: { ...getApprovalSheetsFunctions(apiFunctions) },
});
