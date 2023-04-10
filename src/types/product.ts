import { File, ItemOption, RequestFile } from './common';
import { PagingGETParameters } from './functions';
import { RequireOnly } from './util';

/*
 * Request parameters
 */

export type ProductsGetProductsGETParameters = Partial<
  {
    /** A comma-separated list of Category IDs of the Products that are to be returned */
    readonly category_id: string;
  } & PagingGETParameters
>;

export type RequestProductBody = {
  readonly sync_product: RequestProduct;
  readonly sync_variants: readonly RequestVariant[];
};

//PUT will always be partial, but probably still cleaner just do it all explicitly
// so the functions themselves dont do any modifications to types
export type PutRequestVariant = Partial<VariantFields>;

export type PutRequestProduct = Partial<RequestProduct>;

export type PutRequestProductBody = {
  readonly sync_product: PutRequestProduct;
  readonly sync_variants: readonly PutRequestVariant[];
};

/*
 * Types
 */

export type SyncProduct = {
  readonly id: number;
  readonly external_id: string;
  readonly name: string;
  readonly variants: number;
  readonly synced: number;
  readonly thumbnail_url: string;
  readonly is_ignored: boolean;
};

export type ProductVariant = {
  readonly variant_id: number;
  readonly product_id: number;
  readonly image: string;
  readonly name: string;
};

type ProductMiniInfo = ProductVariant;

export type SyncVariant = {
  readonly id: number;
  readonly external_id: string;
  readonly sync_product_id: number;
  readonly name: string;
  readonly synced: boolean;
  readonly variant_id: number;
  readonly warehouse_product_variant_id: number;
  readonly retail_price: number;
  readonly sku: string;
  readonly currency: string;
  readonly is_ignored: boolean;
  readonly product: ProductVariant;
  readonly files: readonly File[];
  readonly options: readonly ItemOption[];
};

export type RequestProductResponse = SyncProduct;

export type SyncProductInfo = {
  readonly sync_product: SyncProduct;
  readonly sync_variants: readonly SyncVariant[];
};

export type RequestVariantResponse = {
  readonly id: number;
  readonly external_id: string;
  readonly sync_product_id: number;
  readonly name: string;
  readonly synced: boolean;
  readonly variant_id: number;
  readonly retail_price: number;
  readonly currency: string;
  readonly is_ignored: boolean;
  readonly product: ProductMiniInfo;
  readonly files: readonly File[];
  readonly options: readonly ItemOption[];
};

type RequestProduct = {
  readonly external_id: string;
  readonly name: string;
  readonly thumbnail: string;
  readonly is_ignored: boolean;
};

type VariantFields = {
  readonly id: number;
  readonly external_id: string;
  readonly variant_id: number;
  readonly retail_price: number;
  readonly sku: string;
  readonly is_ignored: boolean;
  readonly files: readonly RequestFile[];
  readonly options: readonly ItemOption[];
};

export type RequestVariant = RequireOnly<
  Omit<VariantFields, 'id'>,
  'variant_id' | 'files'
>;

export type SyncVariantInfo = {
  readonly sync_variant: SyncVariant;
  readonly sync_product: SyncProduct;
};

export type SyncStatus = 'synced' | 'unsynced' | 'all';
