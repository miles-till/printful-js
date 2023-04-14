import { Address } from './common';

/*
 * Request parameters
 */

export type TaxRequest = {
  readonly recipient: TaxAddressInfo;
};

/*
 * Types
 */

export type TaxInfo = {
  /** Whether sales tax is required for the given address */
  readonly required: boolean;
  /** Tax rate */
  readonly rate: number;
  /** Whether shipping is taxable */
  readonly shipping_taxable: boolean;
};

type TaxAddressInfo = Pick<
  Address,
  'country_code' | 'state_code' | 'city' | 'zip'
>;
