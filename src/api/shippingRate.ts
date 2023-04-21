//https://developers.printful.com/docs/#tag/Shipping-Rate-API

import type { APIFunctions, EmptyParameters } from '../types/functions';
import type {
  ShippingInfo,
  CalculateRatesRequestBody,
} from '../types/shippingRates';

export const getShippingRateFunctions = ({ create }: APIFunctions) => {
  return {
    /** Returns available shipping options and rates for the given list of products. */
    calculateRates: create<
      ShippingInfo,
      EmptyParameters,
      undefined,
      CalculateRatesRequestBody
    >(() => `/shipping/rates`),
  };
};
