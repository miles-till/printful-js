//https://developers.printful.com/docs/#tag/Store-Information-API

import type { PagingRequest } from '../types/common';
import type { APIFunctions, EmptyParameters } from '../types/functions';
import type {
  ModifyPackingSlipRequestBody,
  ModifyPackingSlipResponse,
  StoreData,
} from '../types/storeInformation';

export const getStoreInformationFunctions = ({
  get,
  create,
}: Readonly<APIFunctions>) => {
  return {
    /** Modifies packing slip information of the currently authorized Printful store. */
    modifyPackingSlip: create<
      ModifyPackingSlipResponse,
      EmptyParameters,
      undefined,
      ModifyPackingSlipRequestBody
    >(() => `/store/packing-slip`),

    /** Get basic information about stores depending on the token access level */
    listStores: get<StoreData[], PagingRequest>(() => `/stores`),

    /** Get basic information about a store based on provided ID */
    getStoreInfo: get<StoreData>(() => `/store`),
  };
};
