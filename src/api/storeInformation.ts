//https://developers.printful.com/docs/#tag/Store-Information-API

import { PagingRequest } from '../types/common';
import { APIFunctions, EmptyParameters } from '../types/functions';
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
      undefined,
      PostRequestPackingSlipBody
    >(() => `/store/packing-slip`),

    /** Get basic information about stores depending on the token access level */
    listStores: get<StoreData[], PagingRequest>(() => `/stores`),

    /** Get basic information about a store based on provided ID */
    getStoreInfo: get<StoreData>(() => `/store`),
  };
};
