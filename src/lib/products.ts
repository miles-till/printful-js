//https://developers.printful.com/docs/#tag/Products-API
import { ProductInfo, VariantInfo } from '../types/catalog';
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import {
  PutRequestVariant,
  RequestProductBody,
  RequestProductResponse,
  RequestVariant,
  RequestVariantResponse,
  SyncProduct,
  SyncProductInfo,
  SyncVariantInfo,
} from '../types/product';

type ProductID = IDParameter<number | string>;

const getProductFunctions = ({
  get,
  list,
  create,
  update,
  del,
}: APIFunctions) => {
  return {
    //Get a list of Sync Products
    listProducts: list<
      readonly SyncProduct[],
      EmptyParameters,
      Partial<{
        readonly status: 'synced' | 'unsynced' | 'all';
        readonly search: string;
        readonly offset: number;
        readonly limit: number;
      }>
    >(
      () => `/store/products`,
      (params) => [{}, params]
    ),

    //Create a new Sync Product
    createProduct: create<
      RequestProductResponse,
      EmptyParameters,
      { readonly body: RequestProductBody }
    >(
      () => `/store/products`,
      (params) => [{}, params]
    ),

    //Get information about a single Sync Product and its Sync Variants
    getProduct: get<SyncProductInfo, ProductID>(
      ({ id }) => `/store/products/${id}`
    ),

    //Delete a Sync Product
    deleteProduct: del<ProductInfo, ProductID>(
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
