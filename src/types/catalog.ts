import {
  AvailabilityStatus,
  AvailableTechnique,
  FileType,
  OptionType,
  PropertyMap,
} from './common';

export type CatalogGetProductsParameters = {
  /** A comma-separated list of Category IDs of the Products that are to be returned */
  readonly category_id: number[];
};

export type CatalogGetVariantParameters = {
  /** Variant id */
  readonly id: number;
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
  /** Variant ID, use this to specify the product when creating orders */
  readonly id: number;
  /** ID of the product that this variant belongs to */
  readonly product_id: number;
  /** Display name */
  readonly name: string;
  /** Item size */
  readonly size: string;
  /** Item color */
  readonly color: string;
  /** Hexadecimal RGB color code. May not exactly reflect the real-world color */
  readonly color_code: string;
  /** Secondary hexadecimal RGB color code. May not exactly reflect the real-world color */
  readonly color_code2: string;
  /** URL of a preview image for this variant */
  readonly image: string;
  /** Variant's price (can change depending on print files and optional settings) */
  readonly price: string;
  /** Stock availability of this variant */
  readonly in_stock: boolean;
  /** Map of [region code, region name] of regions where the variant is available for fulfillment */
  readonly availability_regions: PropertyMap;
  /** Detailed stock status per region */
  readonly availability_status: readonly AvailabilityStatus[];
  /** A list of materials this Variant is composed of */
  readonly material: Material[];
};

export type Material = {
  /** Material name */
  readonly name: string;
  /** Percentage of the material in the product */
  readonly percentage: number;
};

export type VariantInfo = {
  readonly variant: Variant;
  /** Information about the Product that the Variant belongs to */
  readonly product: Product;
};

export type ProductInfo = {
  readonly product: Product;
  readonly variants: readonly Variant[];
};
