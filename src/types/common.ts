import { File } from './fileLibrary';
import { ProductVariant } from './products';

export type PagingRequest = Partial<{
  /** Current result set page offset */
  readonly offset: number;
  /** Max number of items per page */
  readonly limit: number;
}>;

export type PropertyMap = {
  [property_name: string]: unknown;
};

export type FileType = {
  /**
   * File type identifier - use this to specify a file's purpose when creating an order
   *
   * {@link https://developers.printful.com/docs/#section/Placements See examples}
   */
  readonly type: string;
  /** Display name */
  readonly title: string;
  /** Additional price when this print file type is used */
  readonly additional_price: string;
  /** Additional options available to product files */
  readonly options: CatalogFileOption[];
};

export type CatalogFileOption = {
  /** File option identifier. Use this to specify which option you are adding to your file in a request. */
  readonly id: string;
  /** The type of the value property when using this option in a request. */
  readonly type: string;
  /**  */
  readonly title: string;
  /** Additional cost this will add to the item. */
  readonly additional_price: string;
};

export type OptionType = {
  /** Option identifier - use this to specify the option when creating an order */
  readonly id: string;
  /** Display name */
  readonly title: string;
  /** Data type of this option (currently only 'bool' is supported) */
  readonly type: string;
  /** Option values - [key, value] map */
  readonly values: PropertyMap;
  /** Additional price when this option is used */
  readonly additional_price: string;
  /** Additional price breakdown by type - [key, value] map */
  readonly additional_price_breakdown: PropertyMap;
};

export type AvailableTechnique = {
  /** The technique key to be used in the API */
  readonly key: string;
  /** The human-readable technique name */
  readonly display_name: string;
  /** Whether the technique is the default one */
  readonly is_default: boolean;
};

export type Unit = 'inches' | 'cm' | 'inches,cm';

export type Measurement = {
  /** Measurement type */
  readonly type_label: string;
  /** The measurement unit if it's not defined on the size table level or is different */
  readonly unit: Unit;
  /** The measurement values for each size */
  readonly values: MeasurementValue[];
};

export type MeasurementValue = {
  /** The size with which the value is associated */
  readonly size: string;
  /** The single value associated with a size (whether this or min_value and max_value will be present) */
  readonly value: string;
  /** The lower boundary of the value range (whether this and max_value or value will be present) */
  readonly min_value: string;
  /** The upper boundary of the value range (whether this and min_value or value will be present) */
  readonly max_value: string;
};

export type AvailabilityStatus = {
  /** Region code */
  readonly region: string;
  /** Stock status. Possible values include: 'in_stock' - available for fulfillment, 'stocked_on_demand' - available for fulfillment, 'discontinued' - permanently unavailable, 'out_of_stock' - temporarily unavailable */
  readonly status: string;
};

export type Timestamp = number;

export type Primitive = string | number | boolean;

export type ValueType =
  | Primitive
  | Record<string, Primitive>
  | ReadonlyArray<Primitive>;

export type ItemOption = {
  /** Option id */
  readonly id: string;
  /** Option value */
  readonly value: ValueType;
};

export type Address = {
  /** Full name */
  readonly name: string;
  /** Company name */
  readonly company: string;
  /** Address line 1 */
  readonly address1: string;
  /** Address line 2 */
  readonly address2: string;
  /** City */
  readonly city: string;
  /** State code */
  readonly state_code: string;
  /** State name */
  readonly state_name: string;
  /** Country code */
  readonly country_code: string;
  /** Country name */
  readonly country_name: string;
  /** ZIP/Postal code */
  readonly zip: string;
  /** Phone number */
  readonly phone: string;
  /** Email address */
  readonly email: string;
  /**
   * TAX number (`optional`, but in case of Brazil country this field becomes `required` and will be used as CPF/CNPJ number)
   * CPF format is 000.000.000-00 (14 characters);
   * CNPJ format is 00.000.000/0000-00 (18 characters).
   */
  readonly tax_number: string;
};

export type Item = {
  /** Line item ID */
  readonly id: number;
  /** Line item ID from the external system */
  readonly external_id: string;
  /** Variant ID of the item ordered. {@link https://developers.printful.com/docs/#tag/Catalog-API See Catalog API} */
  readonly variant_id: number;
  /** Sync variant ID of the item ordered. {@link https://developers.printful.com/docs/#section/Orders-API-examples/Using-a-sync-variant Example}. */
  readonly sync_variant_id: number;
  /** External variant ID of the item ordered. {@link https://developers.printful.com/docs/#section/Orders-API-examples/Using-sync-variant-with-external-ID Example}. */
  readonly external_variant_id: string;
  /** Warehousing product variant ID of the item ordered. See Warehouse Products API */
  readonly warehouse_product_variant_id: number;
  /** The ID of a Product Template to generate the printfiles from. The `variant_id` field must be passed as well. Can't be combined with following fields: `sync_variant_id`, `external_variant_id`, `warehouse_product_variant_id`, `files`, `options`, `external_product_id`. {@link https://developers.printful.com/docs/#section/Orders-API-examples/Using-a-product-template Examples}. */
  readonly product_template_id: number;
  /** Number of items ordered (Limited to 1000 for one item) */
  readonly quantity: number;
  /** Printful price of the item */
  readonly price: string;
  /** Original retail price of the item to be displayed on the packing slip */
  readonly retail_price: string;
  /** Display name of the item. If not given, a name from the Printful system will be displayed on the packing slip */
  readonly name: string;
  /** Short information about the Printful Product and Variant */
  readonly product: ProductVariant;
  /** Array of attached printfiles / preview images */
  readonly files: readonly File[];
  /** Array of additional options for this product {@link https://developers.printful.com/docs/#section/Options See examples} */
  readonly options: readonly ItemOption[];
  /** Product identifier (SKU) from the external system */
  readonly sku: string;
  /** Whether the item belongs to discontinued product i.e. it's permanently unavailable */
  readonly discontinued: boolean;
  /** Whether the item is out of stock i.e. temporarily unavailable */
  readonly out_of_stock: boolean;
};

export type IncompleteItem = {
  /** Incomplete item name */
  readonly name: string;
  /** Incompleted item quantity */
  readonly quantity: number;
  /** Sync variant ID of the incompleted item. */
  readonly sync_variant_id: number;
  /** External variant ID of the incompleted item. */
  readonly external_variant_id: string;
  /** External order line item id. */
  readonly external_line_item_id: string;
};

export type Costs = {
  /** 3 letter currency code */
  readonly currency: string;
  /** Total cost of all items */
  readonly subtotal: string;
  /** Discount sum */
  readonly discount: string;
  /** Shipping costs */
  readonly shipping: string;
  /** Digitization costs */
  readonly digitization: string;
  /** Additional fee for custom product */
  readonly additional_fee: string;
  /** Custom product fulfillment fee */
  readonly fulfillment_fee: string;
  /** Retail delivery fee */
  readonly retail_delivery_fee: string;
  /** Sum of taxes (not included in the item price) */
  readonly tax: string;
  /** Sum of vat (not included in the item price) */
  readonly vat: string;
  /** Grand Total (subtotal-discount+tax+vat+shipping) */
  readonly total: string;
};

export type CardInfo = {
  readonly type: string;
  readonly number_mask: string;
  readonly expires: string;
};

export type Color = {
  readonly color_name: string;
  readonly color_codes: string[];
};

export type Placement = {
  readonly placement: string;
  readonly display_name: string;
  readonly technique_key: string;
  readonly technique_display_name: string;
};

export type SyncStatus = 'synced' | 'unsynced' | 'all';

export type PackingSlip = {
  /** Customer service email */
  readonly email: string;
  /** Customer service phone */
  readonly phone: string;
  /** Custom packing slip message */
  readonly message: string;
  /** URL address to a sticker we will put on a package */
  readonly logo_url: string;
  /** Store name override for the return address */
  readonly store_name: string;
  /** Your own Order ID that will be printed instead of Printful's Order ID */
  readonly custom_order_id: string;
};
