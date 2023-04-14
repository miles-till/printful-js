//https://developers.printful.com/docs/#tag/Shipping-Rate-API

import { APIFunctions, EmptyParameters } from '../types/functions';
import { ShippingInfo, PostRequestShippingBody } from '../types/shipping_rate';

const getShippingRateFunctions = ({ create }: APIFunctions) => {
  return {
    /** Returns available shipping options and rates for the given list of products. */
    calculateRates: create<
      ShippingInfo,
      EmptyParameters,
      { readonly body: PostRequestShippingBody }
    >(
      () => `/shipping/rates`,
      (params) => [{}, params]
    ),
  };
};

export default getShippingRateFunctions;
