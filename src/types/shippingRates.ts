import { Address, Item } from './common';
import { RequireOnly } from './util';

/*
 * Request parameters
 */

export type PostRequestShippingBody = {
  /** Recipient location information */
  readonly recipient: AddressInfo;
  /** Array of order items */
  readonly items: readonly ItemInfo[];
  /** 3 letter currency code (optional), required if the rates need to be converted to another currency instead of store default currency */
  readonly currency?: string;
  /** Locale in which shipping rate names will be returned. Available options: `en_US` (default), `es_ES` */
  readonly locale: string;
};

type AddressInfo = RequireOnly<
  Pick<
    Address,
    'address1' | 'city' | 'country_code' | 'state_code' | 'zip' | 'phone'
  >,
  'address1' | 'city' | 'country_code'
>;

type ItemInfo =
  | ItemInfoWithVariantId
  | ItemInfoWithExternalVariantId
  | ItemInfoWithWarehouseProductVariantId;

type ItemInfoWithVariantId = RequireOnly<
  ItemInfoWithValue,
  'variant_id' | 'quantity'
>;
type ItemInfoWithExternalVariantId = RequireOnly<
  ItemInfoWithValue,
  'external_variant_id' | 'quantity'
>;
type ItemInfoWithWarehouseProductVariantId = RequireOnly<
  ItemInfoWithValue,
  'warehouse_product_variant_id' | 'quantity'
>;

type ItemInfoWithValue = Pick<
  Item,
  | 'variant_id'
  | 'external_variant_id'
  | 'warehouse_product_variant_id'
  | 'quantity'
> & {
  /** Item retail value - optional but can help to properly calculate */
  readonly value: string;
};

/*
 * Types
 */

export type ShippingInfo = {
  /** Shipping method ID */
  readonly id: string;
  /** Shipping method name */
  readonly name: string;
  /** Shipping rate */
  readonly rate: string;
  /** Currency code in which the rate is returned */
  readonly currency: string;
  /** Estimated minimum delivery days. Warning! This value may not be present in response. */
  readonly minDeliveryDays?: number;
  /** Estimated maximum delivery days. Warning! This value may not be present in response. */
  readonly maxDeliveryDays?: number;
  /** Estimated minimum delivery date. Warning! This value may not be present in response. */
  readonly minDeliveryDate?: number;
  /** Estimated maximum delivery date. Warning! This value may not be present in response. */
  readonly maxDeliveryDate?: number;
};
