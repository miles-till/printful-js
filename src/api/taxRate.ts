//https://developers.printful.com/docs/#tag/Tax-Rate-API

import type { Country } from '../types/countryStateCode';
import type { APIFunctions, EmptyParameters } from '../types/functions';
import type { CalculateTaxRatesRequestBody, TaxInfo } from '../types/taxRate';

export const getTaxRateFunctions = ({
  get,
  create,
}: Readonly<APIFunctions>) => {
  return {
    /** Retrieve state list that requires sales tax calculation */
    getStateTaxRates: get<readonly Country[]>(() => `/tax/countries`),

    /** Calculates sales tax rate for given address if required */
    calculateTaxRate: create<
      TaxInfo,
      EmptyParameters,
      undefined,
      CalculateTaxRatesRequestBody
    >(() => `/tax/rates`),
  };
};
