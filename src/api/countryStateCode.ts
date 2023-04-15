//https://developers.printful.com/docs/#tag/CountryState-Code-API

import { Country } from '../types/countryStateCode';
import { APIFunctions, EmptyParameters } from '../types/functions';

export const getCountryStateCodeFunctions = ({ get }: APIFunctions) => {
  return {
    /** Returns list of countries and states that are accepted by the Printful. */
    getCountryList: get<readonly Country[], EmptyParameters>(
      () => `/countries`
    ),
  };
};
