//https://developers.printful.com/docs/#tag/CountryState-Code-API

import { Country } from '../types/countries';
import { APIFunctions, EmptyParameters } from '../types/functions';

const getCountryFunctions = ({ get }: APIFunctions) => {
  return {
    /** Returns list of countries and states that are accepted by the Printful. */
    getCountryList: get<readonly Country[], EmptyParameters>(
      () => `/countries`
    ),
  };
};

export default getCountryFunctions;
