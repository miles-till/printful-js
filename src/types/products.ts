import type { ItemOption, PagingRequest } from './common';
import type { File } from './fileLibrary';
import type { RequireOnly } from './util';

/*
 * Request parameters
 */

export type ListProductsQueryParameters = Partial<
  {
    /** A comma-separated list of Category IDs of the Products that are to be returned */
    readonly category_id: string;
  } & PagingRequest
>;

export type CreateProductRequestBody = {
  /** Information about the SyncProduct */
  readonly sync_product: CreateProductSyncProduct;
  /** Information about the Sync Variants */
  readonly sync_variants: readonly CreateVariantRequestBody[];
};

type CreateProductSyncProduct = RequireOnly<RequestSyncProduct, 'name'>;

export type CreateVariantRequestBody = RequireOnly<
  Omit<RequestSyncVariant, 'id'>,
  'variant_id' | 'files'
>;

export type ModifyProductRequestBody = {
  /** Information about the SyncProduct */
  readonly sync_product: ModifyProductSyncProduct;
  /** Information about the Sync Variants */
  readonly sync_variants: readonly ModifyVariantRequestBody[];
};

type ModifyProductSyncProduct = RequireOnly<RequestSyncProduct, 'name'>;

export type ModifyVariantRequestBody = RequireOnly<
  RequestSyncVariant,
  'variant_id' | 'files'
>;

type RequestSyncProduct = {
  /** Product ID from the Ecommerce platform */
  readonly external_id: string;
  /** Product name */
  readonly name: string;
  /**
   * <= 250 characters
   *
   * Thumbnail image URL. Although we do not limit thumbnail image size, we recommend to keep it reasonably small.
   */
  readonly thumbnail: string;
  /** Indicates if this Sync Product is ignored */
  readonly is_ignored: boolean;
};

type RequestSyncVariant = {
  /** Sync Variant ID. Please specify the IDs of all Sync Variants you wish to keep. */
  readonly id: number;
  /** Variant ID from the Ecommerce platform */
  readonly external_id: string;
  /** Printful Variant ID that this Sync Variant is synced to */
  readonly variant_id: number;
  /** Retail price that this item is sold for */
  readonly retail_price: string;
  /** Indicates if this Sync Variant is ignored */
  readonly is_ignored: boolean;
  /** SKU of this Sync Variant */
  readonly sku: string;
  /** Array of attached printfiles / preview images */
  readonly files: readonly RequestFile[];
  /** Array of additional options for the configured product/variant {@link https://developers.printful.com/docs/#section/Options See examples} */
  readonly options: readonly ItemOption[];
};

type RequestFile = RequireOnly<
  Pick<File, 'type' | 'url' | 'options' | 'filename' | 'visible'>,
  'url'
>;

/*
 * Types
 */

export type SyncProductInfo = {
  /** Information about the SyncProduct */
  readonly sync_product: SyncProduct;
  /** Array of Sync Variants available for the selected product */
  readonly sync_variants: readonly SyncVariant[];
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
  /** Variant ID */
  readonly variant_id: number;
  /** Product ID of this variant */
  readonly product_id: number;
  /** URL of a sample image for this variant */
  readonly image: string;
  /** Display name of this variant */
  readonly name: string;
};

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
  readonly retail_price: string;
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
