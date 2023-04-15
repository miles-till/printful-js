//https://developers.printful.com/docs/#tag/Store-Information-API

import {
  APIFunctions,
  EmptyParameters,
  PagingGETParameters,
} from '../types/functions';
import {
  PostRequestPackingSlipBody,
  PostResponsePackingSlip,
  StoreData,
} from '../types/storeInformation';

export const getStoreInformationFunctions = ({ get, create }: APIFunctions) => {
  return {
    /** Modifies packing slip information of the currently authorized Printful store. */
    modifyPackingSlip: create<
      PostResponsePackingSlip,
      EmptyParameters,
      { readonly body: PostRequestPackingSlipBody }
    >(
      () => `/store/packing-slip`,
      (params) => [{}, params]
    ),

    /** Get basic information about stores depending on the token access level */
    listStores: get<StoreData[], PagingGETParameters>(() => `/stores`),

    /** Get basic information about a store based on provided ID */
    getStoreInfo: get<StoreData, EmptyParameters>(() => `/store`),
  };
};
