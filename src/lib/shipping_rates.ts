//https://developers.printful.com/docs/#tag/Shipping-Rate-API

import { APIFunctions, EmptyParameters } from '../types/functions';
import { ShippingInfo, ShippingRequest } from '../types/shipping_rate';

// type Status = string;

const getShippingRateFunctions = ({ create }: APIFunctions) => {
  return {
    //Calculate shipping rates
    calculateRates: create<
      ShippingInfo,
      EmptyParameters,
      { readonly body: ShippingRequest }
    >(
      () => `/files`,
      (params) => [{}, params]
    ),
  };
};

export default getShippingRateFunctions;
