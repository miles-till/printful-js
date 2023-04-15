//https://developers.printful.com/docs/#tag/Tax-Rate-API

import { Country } from '../types/countryStateCode';
import { APIFunctions, EmptyParameters } from '../types/functions';
import { TaxInfo, TaxRequest } from '../types/taxRate';

const getTaxRateFunctions = ({ get, create }: APIFunctions) => {
  return {
    /** Retrieve state list that requires sales tax calculation */
    getStateTaxRates: get<readonly Country[], EmptyParameters>(
      () => `/tax/countries`
    ),

    /** Calculates sales tax rate for given address if required */
    calculateTaxRate: create<
      TaxInfo,
      EmptyParameters,
      { readonly body: TaxRequest }
    >(
      () => `/tax/rates`,
      (params) => [{}, params]
    ),
  };
};

export default getTaxRateFunctions;
