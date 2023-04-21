import type { PagingRequest } from './common';

/*
 * Request parameters
 */

export type ListWarehouseProductsQueryParameters = Partial<
  {
    /** Filter by partial or full product name */
    readonly query: string;
  } & PagingRequest
>;

/*
 * Types
 */

export type WarehouseProduct = {
  /** Product ID */
  readonly id: number;
  /** Product name */
  readonly name: string;
  /**
   * Enum: `"created"` `"active"` `"suspended"` `"declined"` `"draft"`
   *
   * Product status:
   *
   * **created** - product request created,
   *
   * **active** - product request approved
   *
   * **suspended** - product suspended
   *
   * **declined** - product request declined
   *
   * **draft** - product created as a draft
   */
  readonly status: WarehouseProductStatus;
  /** Currency */
  readonly currency: string;
  /** Image URL of product */
  readonly image_url: string;
  /** Retail price of product */
  readonly retail_price: number;
  /** Array of product variants */
  readonly variants: readonly WarehouseProductVariant[];
};

type WarehouseProductStatus =
  | 'created'
  | 'active'
  | 'suspended'
  | 'declined'
  | 'draft';

export type WarehouseProductVariant = {
  /** Product variant ID */
  readonly id: number;
  /** Name of product variant */
  readonly name: string;
  /** SKU of product variant */
  readonly sku: string;
  /** Image URL of product variant */
  readonly image_url: string;
  /** Retail price of product variant */
  readonly retail_price: number;
  /** Quantity of product variant in our stock */
  readonly quantity: number;
  /** Length of product variant */
  readonly length: number;
  /** Width of product variant */
  readonly width: number;
  /** Height of product variant */
  readonly height: number;
  /** Weight of product variant */
  readonly weight: number;
};
