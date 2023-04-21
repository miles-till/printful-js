//https://developers.printful.com/docs/#tag/Ecommerce-Platform-Sync-API

import type {
  APIFunctions,
  EmptyParameters,
  IDParameter,
} from '../types/functions';
import type { ListProductsQueryParameters } from '../types/ecommercePlatformSync';
import type {
  ModifyVariantRequestBody,
  SyncProduct,
  SyncProductInfo,
  SyncVariant,
} from '../types/products';

/** Sync Product ID (integer) or External ID (if prefixed with @) */
type ProductID = IDParameter<number | string>;

export const getEcommercePlatformSyncFunctions = ({
  get,
  update,
  del,
}: APIFunctions) => {
  return {
    /** Returns list of Sync Product objects from your store. */
    listProducts: get<
      readonly SyncProduct[],
      EmptyParameters,
      ListProductsQueryParameters
    >(() => `/store/products`),

    /** Get information about a single Sync Product and its Sync Variants */
    getProduct: get<SyncProductInfo, ProductID>(
      ({ id }) => `/store/products/${id}`
    ),

    /** Deletes a Sync Product with all of its Sync Variants */
    deleteProduct: del<SyncProductInfo, ProductID>(
      ({ id }) => `/store/products/${id}`
    ),

    /** Get information about a single Sync Variant */
    getVariant: get<SyncVariant, ProductID>(
      ({ id }) => `/store/variants/${id}`
    ),

    /**
     * Modifies an existing Sync Variant.
     *
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     *
     * {@link https://developers.printful.com/docs/#section/Ecommerce-Platform-Sync-API-examples/Modify-a-Sync-Variant See examples}
     */
    modifyVariant: update<
      SyncVariant,
      ProductID,
      undefined,
      ModifyVariantRequestBody
    >(({ id }) => `/store/variants/${id}`),

    /** Deletes configuraton information (`variant_id`, print files and options) and disables automatic order importing for this Sync Variant. */
    deleteVariant: del<SyncVariant, ProductID>(
      ({ id }) => `/store/variants/${id}`
    ),
  };
};
