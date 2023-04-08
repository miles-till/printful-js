//https://developers.printful.com/docs/#tag/Store-Information-API

import { APIFunctions, EmptyParameters } from '../types/functions';
import { PackingSlip, StoreData } from '../types/store';

const getStoreFunctions = ({ get, create }: APIFunctions) => {
  return {
    //Get store information
    getStoreInfo: get<StoreData, EmptyParameters>(() => `/store`),

    //Change store packing slip
    modifyPackingSlip: create<
      PackingSlip,
      EmptyParameters,
      { readonly body: PackingSlip }
    >(
      () => `/store/packing-slip`,
      (params) => [{}, params]
    ),
  };
};

export default getStoreFunctions;
