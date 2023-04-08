//https://developers.printful.com/docs/#tag/Tax-Rate-API

import { Country } from '../types/countries';
import { APIFunctions, EmptyParameters } from '../types/functions';
import { TaxInfo, TaxRequest } from '../types/tax_rate';

const getTaxFunctions = ({ get, create }: APIFunctions) => {
  return {
    //Retrieve state list that requires sales tax calculation
    getStateTaxRates: get<readonly Country[], EmptyParameters>(
      () => `/tax/countries`
    ),

    //Calculate tax rate
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

export default getTaxFunctions;
