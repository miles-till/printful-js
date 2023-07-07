//https://developers.printful.com/docs/#tag/CountryState-Code-API

import type { Country } from '../types/countryStateCode';
import type { APIFunctions } from '../types/functions';

export const getCountryStateCodeFunctions = ({
  get,
}: Readonly<APIFunctions>) => {
  return {
    /** Returns list of countries and states that are accepted by the Printful. */
    getCountryList: get<readonly Country[]>(() => `/countries`),
  };
};
