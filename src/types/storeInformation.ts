import type { PackingSlip } from './common';
import type { RequireOnly } from './util';

/*
 * Request parameters
 */

export type ModifyPackingSlipRequestBody = StorePackingSlip;

export type ModifyPackingSlipResponse = {
  packing_slip: StorePackingSlip;
};

/*
 * Types
 */

export type StorePackingSlip =
  | EmailPackingSlip
  | PhonePackingSlip
  | MessagePackingSlip
  | CustomOrderIdPackingSlip;

type EmailPackingSlip = RequireOnly<PackingSlip, 'email'>;

type PhonePackingSlip = RequireOnly<PackingSlip, 'phone'>;

type MessagePackingSlip = RequireOnly<PackingSlip, 'message'>;

type CustomOrderIdPackingSlip = RequireOnly<PackingSlip, 'custom_order_id'>;

export type StoreData = {
  /** Store ID */
  readonly id: number;
  /** Store type */
  readonly type: string;
  /** Store name */
  readonly name: string;
};
