import { ProductVariant } from './product';

export type FileType = { readonly temp: string };
export type OptionType = { readonly temp: string };
export type AvailabilityStatus = { readonly temp: string };

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
  placement: string;
  display_name: string;
  technique_key: string;
  technique_display_name: string;
};
