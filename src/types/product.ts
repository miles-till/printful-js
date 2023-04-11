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
  /** Information about the SyncProduct */
  readonly sync_product: RequestProduct;
  /** Information about the Sync Variants */
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

export type SyncProductInfo = {
  /** Information about the SyncProduct */
  readonly sync_product: SyncProduct;
  /** Array of Sync Variants available for the selected product */
  readonly sync_variants: readonly SyncVariant[];
};

export type SyncVariantInfo = {
  readonly sync_variant: SyncVariant;
  readonly sync_product: SyncProduct;
};

export type SyncProduct = {
  /** SyncProduct ID */
  readonly id: number;
  /** Product ID from the Ecommerce platform */
  readonly external_id: string;
  /** Product name */
  readonly name: string;
  /** Total number of Sync Variants belonging to this product */
  readonly variants: number;
  /** Number of synced Sync Variants belonging to this product */
  readonly synced: number;
  /** Thumbnail image for the product */
  readonly thumbnail_url: string;
  /** Indicates if this Sync Product is ignored */
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
  /** Sync Variant ID */
  readonly id: number;
  /** Variant ID from the Ecommerce platform */
  readonly external_id: string;
  /** Sync Product ID that this variant belongs to */
  readonly sync_product_id: number;
  /** Sync Variant name */
  readonly name: string;
  /** Indicates if this Sync Variant is properly linked with Printful product */
  readonly synced: boolean;
  /** Printful Variant ID that this Sync Variant is synced to */
  readonly variant_id: number;
  /** Retail price that this item is sold for */
  readonly retail_price: number;
  /** Currency in which prices are returned */
  readonly currency: string;
  /** Indicates if this Sync Variant is ignored */
  readonly is_ignored: boolean;
  /** SKU of this Sync Variant */
  readonly sku: string;
  /** Short information about the Printful Product and Variant */
  readonly product: ProductVariant;
  /** Array of attached printfiles / preview images */
  readonly files: readonly File[];
  /**
   * Array of additional options for the configured product/variant
   *
   * {@link https://developers.printful.com/docs/#section/Options See examples}
   */
  readonly options: readonly ItemOption[];
  /** Printful Variant catalog category ID */
  readonly main_category_id: number;
  /** Warehousing variant id. If sync variant is connected with a warehousing item, this is its id */
  readonly warehouse_product_variant_id: number;
};

/** Information about the SyncProduct */
export type RequestProductResponse = SyncProduct;

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

export type SyncStatus = 'synced' | 'unsynced' | 'all';
