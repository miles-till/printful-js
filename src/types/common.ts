import { ProductVariant } from './product';

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

export type File = {
  /** Role of the file */
  readonly type: string;
  /** File ID */
  readonly id: number;
  /** Source URL where the file is downloaded from */
  readonly url: string;
  /**
   * Array of additional options for this file
   *
   * {@link https://developers.printful.com/docs/#section/Options See examples}
   */
  readonly options: readonly FileOption[];
  /** MD5 checksum of the file */
  readonly hash: string;
  /** File name */
  readonly filename: string;
  /** MIME type of the file */
  readonly mime_type: string;
  /** Size in bytes */
  readonly size: number;
  /** Width in pixels */
  readonly width: number;
  /** Height in pixels */
  readonly height: number;
  /**
   * Resolution DPI.
   *
   * Note: for vector files this may be indicated as only 72dpi, but it doesn't affect print quality since the vector files are resolution independent.
   */
  readonly dpi: number;
  /** File processing status:
   *
   * ok - file was processed successfuly
   *
   * waiting - file is being processed
   *
   * failed - file failed to be processed
   */
  readonly status: 'ok' | 'waiting' | 'failed';
  /** File creation timestamp */
  readonly created: Timestamp;
  /** Small thumbnail URL */
  readonly thumbnail_url: string;
  /** Medium preview image URL */
  readonly preview_url: string;
  /** Show file in the Printfile Library (default true) */
  readonly visible: boolean;
  /** Whether it is a temporary printfile. */
  readonly id_temporary: boolean;
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
  /** Option id */
  readonly id: string;
  /** Option value */
  readonly value: ValueType;
};

export type ItemOption = {
  /** Option id */
  readonly id: string;
  /** Option value */
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

export type SyncStatus = 'synced' | 'unsynced' | 'all';
