//https://developers.printful.com/docs/#tag/Products-API

import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import {
  ProductsGetProductsGETParameters,
  PutRequestProductBody,
  PutRequestSyncVariant,
  PostRequestProductBody,
  PostRequestSyncVariant,
  SyncProduct,
  SyncProductInfo,
  SyncVariant,
} from '../types/products';

/** Sync Product ID (integer) or External ID (if prefixed with @) */
type ProductID = IDParameter<number | string>;

const getProductsFunctions = ({
  get,
  list,
  create,
  update,
  del,
}: APIFunctions) => {
  return {
    /** Returns a list of Sync Product objects from your custom Printful store. */
    listProducts: list<
      readonly SyncProduct[],
      EmptyParameters,
      ProductsGetProductsGETParameters
    >(
      () => `/store/products`,
      (params) => [{}, params]
    ),

    /** Creates a new Sync Product together with its Sync Variants ({@link https://developers.printful.com/docs/#section/Products-API-examples/Create-a-new-Sync-Product See examples}). */
    createProduct: create<
      SyncProduct,
      EmptyParameters,
      { readonly body: PostRequestProductBody }
    >(
      () => `/store/products`,
      (params) => [{}, params]
    ),

    /** Get information about a single Sync Product and its Sync Variants. */
    getProduct: get<SyncProductInfo, ProductID>(
      ({ id }) => `/store/products/${id}`
    ),

    /** Deletes a Sync Product with all of its Sync Variants */
    deleteProduct: del<SyncProductInfo, ProductID>(
      ({ id }) => `/store/products/${id}`
    ),

    /**
     * Modifies an existing Sync Product with its Sync Variants.
     *
     * Please note that in the request body you only need to specify the fields that need to be changed. Furthermore, if you want to update existing sync variants, then in the sync variants array you must specify the IDs of all existing sync variants. All omitted existing sync variants will be deleted. All new sync variants without an ID will be created. See examples for more insights.
     *
     * Rate limiting: Up to 10 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.
     *
     * {@link https://developers.printful.com/docs/#section/Products-API-examples/Modify-a-Sync-Product See examples}
     */
    modifyProduct: update<
      SyncProduct,
      ProductID,
      { readonly body: PutRequestProductBody }
    >(
      ({ id }) => `/store/products/${id}`,
      ({ id, ...putParams }) => [{ id }, putParams]
    ),

    /** Get information about a single Sync Variant. */
    getVariant: get<SyncVariant, ProductID>(
      ({ id }) => `/store/variants/${id}`
    ),

    /** Deletes a single Sync Variant. */
    deleteVariant: del<SyncVariant, ProductID>(
      ({ id }) => `/store/variants/${id}`
    ),

    /**
     * Modifies an existing Sync Variant.
     *
     * Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
     *
     * {@link https://developers.printful.com/docs/#section/Products-API-examples/Modify-a-Sync-Variant See examples}
     */
    modifyVariant: update<
      SyncVariant,
      ProductID,
      { readonly body: PutRequestSyncVariant }
    >(
      ({ id }) => `/store/variants/${id}`,
      ({ id, ...putParams }) => [{ id }, putParams]
    ),

    /** Creates a new Sync Variant for an existing Sync Product ({@link https://developers.printful.com/docs/#section/Products-API-examples/Create-a-new-Sync-Variant See examples}). */
    createVariant: create<
      SyncVariant,
      ProductID,
      { readonly body: PostRequestSyncVariant }
    >(
      ({ id }) => `/store/products/${id}/variants`,
      ({ id, ...putParams }) => [{ id }, putParams]
    ),
  };
};

export default getProductsFunctions;
