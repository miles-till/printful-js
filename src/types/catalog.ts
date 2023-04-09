import {
  AvailabilityStatus,
  AvailableTechnique,
  FileType,
  OptionType,
} from './common';

export type CatalogGetProductsParameters = {
  /** A comma-separated list of Category IDs of the Products that are to be returned */
  readonly category_id: number[];
};

export type Product = {
  /** Product ID */
  readonly id: number;
  /** Main category of product */
  readonly main_category_id: number;
  /** Product type identifier */
  readonly type: string;
  /** Product type name */
  readonly type_name: string;
  /** Product title */
  readonly title: string;
  /** Brand name */
  readonly brand: string;
  /** Model name */
  readonly model: string;
  /** URL of a sample image for this product */
  readonly image: string;
  /** Number of available variants for this product */
  readonly variant_count: number;
  /** Currency in which prices are returned */
  readonly currency: string;
  /** Definitions of Print/Mockup file categories that can be attached to this product */
  readonly files: readonly FileType[];
  /**
   * Definitions of additional options that are available for this product
   *
   * {@link https://developers.printful.com/docs/#section/Options See examples}
   */
  readonly options: readonly OptionType[];
  /** If product is disabled in push */
  readonly is_discontinued: boolean;
  /** Average number of days for order to be fulfilled */
  readonly avg_fulfillment_time: number;
  /** Product description */
  readonly description: string;
  /** Available techniques */
  readonly techniques: AvailableTechnique[];
  /** The origin country for inside label */
  readonly origin_country: string | null;
};

export type Variant = {
  readonly id: number;
  readonly product_id: number;
  readonly name: string;
  readonly size: string;
  readonly color: string;
  readonly color_code: string;
  readonly color_code2: string;
  readonly image: string;
  readonly price: string;
  readonly in_stock: boolean;
  readonly availability_regions: readonly (readonly string[])[];
  readonly availability_status: readonly AvailabilityStatus[];
};

export type VariantInfo = {
  readonly variant: Variant;
  readonly product: Product;
};

export type ProductInfo = {
  readonly product: Product;
  readonly variants: readonly Variant[];
};
