//https://developers.printful.com/docs/#tag/Products-API

import type {
  APIFunctions,
  EmptyParameters,
  IDParameter,
} from '../types/functions';
import type {
  CreateProductRequestBody,
  CreateVariantRequestBody,
  ListProductsQueryParameters,
  ModifyProductRequestBody,
  ModifyVariantRequestBody,
  SyncProduct,
  SyncProductInfo,
  SyncVariant,
} from '../types/products';

/** Sync Product ID (integer) or External ID (if prefixed with @) */
type ProductID = IDParameter<number | string>;

export const getProductsFunctions = ({
  get,
  create,
  update,
  del,
}: Readonly<APIFunctions>) => {
  return {
    /** Returns a list of Sync Product objects from your custom Printful store. */
    listProducts: get<
      readonly SyncProduct[],
      EmptyParameters,
      ListProductsQueryParameters
    >(() => `/store/products`),

    /** Creates a new Sync Product together with its Sync Variants ({@link https://developers.printful.com/docs/#section/Products-API-examples/Create-a-new-Sync-Product See examples}). */
    createProduct: create<
      SyncProduct,
      EmptyParameters,
      undefined,
      CreateProductRequestBody
    >(() => `/store/products`),

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
      undefined,
      ModifyProductRequestBody
    >(({ id }) => `/store/products/${id}`),

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
      undefined,
      ModifyVariantRequestBody
    >(({ id }) => `/store/variants/${id}`),

    /** Creates a new Sync Variant for an existing Sync Product ({@link https://developers.printful.com/docs/#section/Products-API-examples/Create-a-new-Sync-Variant See examples}). */
    createVariant: create<
      SyncVariant,
      ProductID,
      undefined,
      CreateVariantRequestBody
    >(({ id }) => `/store/products/${id}/variants`),
  };
};
