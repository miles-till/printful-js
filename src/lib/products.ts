//https://developers.printful.com/docs/#tag/Products-API
import { ProductInfo, VariantInfo } from '../types/catalog';
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import {
  ProductsGetProductsGETParameters,
  PutRequestVariant,
  RequestProductBody,
  RequestProductResponse,
  RequestVariant,
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
      RequestProductResponse,
      EmptyParameters,
      { readonly body: RequestProductBody }
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

    //Modify a Sync Product
    modifyProduct: update<
      RequestProductResponse,
      ProductID,
      { readonly body: RequestProductResponse }
    >(
      ({ id }) => `/store/products/${id}`,
      ({ id, ...putParams }) => [{ id }, putParams]
    ),

    //Create a new Sync Variant
    createVariant: create<
      RequestVariantResponse,
      ProductID,
      { readonly body: RequestVariant }
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
      { readonly body: PutRequestVariant }
    >(
      ({ id }) => `/store/variants/${id}`,
      ({ id, ...putParams }) => [{ id }, putParams]
    ),
  };
};

export default getProductFunctions;
