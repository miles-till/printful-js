import { ProductVariant } from './product';

export type PropertyMap = {
  [property_name: string]: any;
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

export type AvailabilityStatus = {
  /** Region code */
  readonly region: string;
  /** Stock status. Possible values include: 'in_stock' - available for fulfillment, 'stocked_on_demand' - available for fulfillment, 'discontinued' - permanently unavailable, 'out_of_stock' - temporarily unavailable */
  readonly status: string;
};

export type Timestamp = number;

export type Primitive = string | number | boolean;

export type File = {
  readonly id: number;
  readonly type: string;
  readonly hash: string;
  readonly url: string;
  readonly filename: string;
  readonly mime_type: string;
  readonly size: number;
  readonly width: number;
  readonly height: number;
  readonly dpi: number;
  readonly status: string; // "ok" | "waiting" | "failed"
  readonly created: Timestamp;
  readonly thumbnail_url: string;
  readonly preview_url: string;
  readonly visible: boolean;
  readonly options: readonly FileOption[];
};

export type RequestFile = {
  readonly type: string;
  readonly id: number;
  readonly url: string;
  readonly options: readonly FileOption[];
};

export type ValueType =
  | Primitive
  | Record<string, Primitive>
  | ReadonlyArray<Primitive>;

export type FileOption = {
  readonly id: string;
  readonly value: ValueType;
};

export type ItemOption = {
  readonly id: string;
  readonly value: ValueType;
};

export type Address = {
  readonly name: string;
  readonly company: string;
  readonly address1: string;
  readonly address2: string;
  readonly city: string;
  readonly state_code: string;
  readonly state_name: string;
  readonly country_code: string;
  readonly country_name: string;
  readonly zip: string;
  readonly phone: string;
  readonly email: string;
};

export type Item = {
  readonly id: number;
  readonly external_id: string;
  readonly variant_id: number;
  readonly sync_variant_id: number;
  readonly external_variant_id: string;
  readonly warehouse_product_variant_id: number;
  readonly quantity: number;
  readonly price: string;
  readonly retail_price: string;
  readonly name: string;
  readonly product: ProductVariant;
  readonly files: readonly File[];
  readonly options: readonly ItemOption[];
  readonly sku: string;
};

export type IncompleteItem = {
  readonly name: string;
  readonly quantity: number;
  readonly sync_variant_id: number;
  readonly external_variant_id: string;
  readonly external_line_item_id: string;
};

export type Costs = {
  readonly currency: string;
  readonly subtotal: string;
  readonly discount: string;
  readonly shipping: string;
  readonly digitization: string;
  readonly tax: string;
  readonly vat: string;
  readonly total: string;
};

type ShipmentItem = {
  readonly item_id: number;
  readonly quantity: number;
};

export type Shipment = {
  readonly id: number;
  readonly carrier: string;
  readonly service: string;
  readonly tracking_number: string;
  readonly tracking_url: string;
  readonly created: Timestamp;
  readonly ship_date: string;
  readonly shipped_at: number;
  readonly reshipment: true;
  readonly items: ShipmentItem;
};

export type GiftData = {
  readonly subject: string;
  readonly message: string;
};

export type OrderPackingSlip = {
  readonly email: string;
  readonly phone: string;
  readonly message: string;
  readonly logo_url: string;
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
