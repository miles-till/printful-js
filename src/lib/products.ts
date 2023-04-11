//https://developers.printful.com/docs/#tag/Products-API
import { VariantInfo } from '../types/catalog';
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import {
  ProductsGetProductsGETParameters,
  PutRequestProductBody,
  PutRequestSyncVariant,
  PostRequestProductBody,
  PostRequestSyncVariant,
  RequestVariantResponse,
  SyncProduct,
  SyncProductInfo,
  SyncVariantInfo,
} from '../types/product';

/** Sync Product ID (integer) or External ID (if prefixed with @) */
type ProductID = IDParameter<number | string>;

const getProductFunctions = ({
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

    //Create a new Sync Variant
    createVariant: create<
      RequestVariantResponse,
      ProductID,
      { readonly body: PostRequestSyncVariant }
    >(
      ({ id }) => `/store/products/${id}/variants`,
      ({ id, ...putParams }) => [{ id }, putParams]
    ),

    //Get information about a single Sync Variant
    getVariant: get<SyncVariantInfo, ProductID>(
      ({ id }) => `/store/variants/${id}`
    ),

    //Delete a Sync Variant
    deleteVariant: get<VariantInfo, ProductID>(
      ({ id }) => `/store/variants/${id}`
    ),

    //Modify a Sync Variant
    modifyVariant: update<
      RequestVariantResponse,
      ProductID,
      { readonly body: PutRequestSyncVariant }
    >(
      ({ id }) => `/store/variants/${id}`,
      ({ id, ...putParams }) => [{ id }, putParams]
    ),
  };
};

export default getProductFunctions;
