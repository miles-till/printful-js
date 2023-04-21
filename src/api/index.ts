import type { APIFunctions } from '../types/functions';

import { getCatalogFunctions } from './catalog';
import { getProductsFunctions } from './products';
import { getEcommercePlatformSyncFunctions } from './ecommercePlatformSync';
import { getProductTemplatesFunctions } from './productTemplates';
import { getOrdersFunctions } from './orders';
import { getFileLibraryFunctions } from './fileLibrary';
import { getShippingRateFunctions } from './shippingRate';
import { getCountryStateCodeFunctions } from './countryStateCode';
import { getTaxRateFunctions } from './taxRate';
import { getWebhookFunctions } from './webhook';
import { getStoreInformationFunctions } from './storeInformation';
import { getMockupGeneratorFunctions } from './mockupGenerator';
import { getWarehouseProductsFunctions } from './warehouseProducts';
import { getReportsFunctions } from './reports';
import { getApprovalSheetsFunctions } from './approvalSheets';

export const getApi = (apiFunctions: APIFunctions) => ({
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
