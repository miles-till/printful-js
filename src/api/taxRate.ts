//https://developers.printful.com/docs/#tag/Tax-Rate-API

import { Country } from '../types/countryStateCode';
import { APIFunctions, EmptyParameters } from '../types/functions';
import { TaxInfo, TaxRequest } from '../types/taxRate';

export const getTaxRateFunctions = ({ get, create }: APIFunctions) => {
  return {
    /** Retrieve state list that requires sales tax calculation */
    getStateTaxRates: get<readonly Country[]>(() => `/tax/countries`),

    /** Calculates sales tax rate for given address if required */
    calculateTaxRate: create<TaxInfo, EmptyParameters, undefined, TaxRequest>(
      () => `/tax/rates`
    ),
  };
};
