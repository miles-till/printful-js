import {
  Address,
  Costs,
  IncompleteItem,
  Item,
  PackingSlip,
  PagingRequest,
  Timestamp,
} from './common';
import { IDParameter } from './functions';
import { RequireOnly } from './util';

/*
 * Request parameters
 */

export type OrdersGetOrdersGETParameters = {
  readonly status: OrderStatus;
} & PagingRequest;

export type OrdersPostOrderPOSTParameters = Partial<{
  /** Automatically submit the newly created order for fulfillment (skip the Draft phase) */
  readonly confirm: boolean;
  /** Try to update existing order if an order with the specified external_id already exists */
  readonly update_existing: boolean;
}>;

export type PostRequestOrderBody = RequireOnly<
  Pick<
    Order,
    | 'external_id'
    | 'shipping'
    | 'recipient'
    | 'items'
    | 'retail_costs'
    | 'gift'
    | 'packing_slip'
  >,
  'recipient' | 'items'
>;

export type OrdersPutOrderPUTParameters = OrderID & {
  /** Automatically submit the newly created order for fulfillment (skip the Draft phase) */
  readonly confirm: boolean;
};

/*
 * Types
 */

/** Order ID (integer) or External ID (if prefixed with @) */
export type OrderID = IDParameter<number | string>;

export type Order = {
  /** Order ID */
  readonly id: number;
  /**Order ID from the external system */
  readonly external_id: string;
  /** Store ID */
  readonly store: number;
  /**
   * Order status:
   *
   * draft - order is not submitted for fulfillment
   *
   * failed - order was submitted for fulfillment but was not accepted because of an error (problem with address, printfiles, charging, etc.)
   *
   * pending - order has been submitted for fulfillment
   *
   * canceled - order is canceled
   *
   * onhold - order has encountered a problem during the fulfillment that needs to be resolved together with the Printful customer service inprocess - order is being fulfilled and is no longer cancellable
   *
   * partial - order is partially fulfilled (some items are shipped already, the rest will follow)
   *
   * fulfilled - all items are shipped
   */
  readonly status: OrderStatus;
  /** Shipping method. Defaults to 'STANDARD' */
  readonly shipping: string;
  /** Human readable shipping method name. */
  readonly shipping_service_name: string;
  /** Time when the order was created */
  readonly created: Timestamp;
  /** Time when the order was updated */
  readonly updated: Timestamp;
  /** Information about the address */
  readonly recipient: Address;
  /** Array of items in the order */
  readonly items: readonly Item[];
  /** Array of branding items in the order */
  readonly branding_items: readonly Item[];
  /** Array of incomplete items in the order */
  readonly incomplete_items: readonly IncompleteItem[];
  /** Order costs (Printful prices) */
  readonly costs: Costs;
  /** Retail costs that are to be displayed on the packing slip for international shipments. Retail costs are used only if every item in order contains the retail_price attribute. */
  readonly retail_costs: Costs;
  /** Difference between order price and retail costs. Will be shown only if order is completed. */
  readonly pricing_breakdown: readonly PricingBreakdown[];
  /** Array of shipments already shipped for this order */
  readonly shipments: readonly OrderShipment[];
  /** Optional gift message for the packing slip */
  readonly gift: OrderGift;
  /** Custom packing slip for this order. Example of a packing slip with explained fields can be found {@link https://developers.printful.com/docs/#packing-slip here}. */
  readonly packing_slip: OrderPackingSlip;
};

/**
 * Each order will go through different states while being processed. The following order status types indicate those states:
 *
 * | status    | description |
 * | :-------- | :---------- |
 * | draft     | The order is created but is not yet submitted for fulfillment. You still can edit it and confirm later. |
 * | pending   | The order has been submitted for fulfillment, but is not yet accepted for fulfillment. You can still cancel the order if you need. |
 * | failed    | Order was submitted for fulfillment but was returned for review because of an error (problem with address, missing printfiles, charging has failed, etc.). |
 * | canceled  | The order has been canceled and can no longer be processed. If the order was charged then the amount has been returned to your credit card. |
 * | inprocess | The order is being fulfilled and can no longer be cancelled or modified. Contact customer support if there are any issues with the order at this point. |
 * | onhold    | The order has encountered a problem during the fulfillment that needs to be resolved together with Printful customer service before fulfillment can continue. |
 * | partial   | The order is partially fulfilled (some items are shipped already, the rest will follow) |
 * | fulfilled | All items have been shipped successfully |
 * | archived  | The order has been archived and hidden from the UI |
 *
 * To sum up, the API allows you to create orders with status draft and then move them to state pending (both steps can be done with a single action). You are only charged for orders that have been confirmed. If the order encounters a problem after it has been submitted, then it is moved to the failed state so that the problem can be fixed and the order can be resubmitted.
 */
export type OrderStatus =
  | 'draft'
  | 'pending'
  | 'failed'
  | 'canceled'
  | 'inprocess'
  | 'onhold'
  | 'partial'
  | 'fulfilled'
  | 'archived';

export type OrderRetailCosts = Omit<
  Costs,
  'digitization' | 'additional_fee' | 'fulfillment_fee' | 'retail_delivery_fee'
>;

export type PricingBreakdown = {
  /** Amount customer paid */
  readonly customer_pays: string;
  /** Printful price */
  readonly printful_price: string;
  /** Profit */
  readonly profit: string;
  /** Shipment tracking number */
  readonly currency_symbol: string;
};

export type OrderShipment = {
  /** Shipment ID */
  readonly id: number;
  /** Carrier name */
  readonly carrier: string;
  /** Delivery service name */
  readonly service: string;
  /** Shipment tracking number */
  readonly tracking_number: string;
  /** Shipment tracking URL */
  readonly tracking_url: string;
  /** Shipping time */
  readonly created: Timestamp;
  /** Ship date */
  readonly ship_date: string;
  /** Ship time in unix timestamp */
  readonly shipped_at: number;
  /** Whether this is a reshipment */
  readonly reshipment: true;
  /** Array of items in this shipment */
  readonly items: OrderShipmentItem;
};

type OrderShipmentItem = {
  /** Line item ID */
  readonly item_id: number;
  /** Quantity of items in this shipment */
  readonly quantity: number;
  /**
   * Enum: `0` `1`
   * A boolean indicating that the pickup stage of this item's fulfillment has been completed
   */
  readonly picked: number;
  /**
   * Enum: `0` `1`
   * A boolean indicting that the item has been printed, sublimated or sewed.
   */
  readonly printed: number;
};

export type OrderGift = {
  /** Gift message title */
  readonly subject: string;
  /** Gift message text */
  readonly message: string;
};

export type OrderPackingSlip =
  | EmailPackingSlip
  | PhonePackingSlip
  | MessagePackingSlip
  | CustomOrderIdPackingSlip;

type EmailPackingSlip = RequireOnly<PackingSlip, 'email'>;

type PhonePackingSlip = RequireOnly<PackingSlip, 'phone'>;

type MessagePackingSlip = RequireOnly<PackingSlip, 'message'>;

type CustomOrderIdPackingSlip = RequireOnly<PackingSlip, 'custom_order_id'>;

export type OrderCosts = {
  /** Order costs (Printful prices) */
  readonly costs: Costs;
  /** Retail costs that are to be displayed on the packing slip for international shipments. Retail costs are used only if every item in order contains the `retail_price` attribute. */
  readonly retail_costs: OrderRetailCosts;
};
