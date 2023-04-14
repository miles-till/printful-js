import { PagingGETParameters } from './functions';

/*
 * Request parameters
 */

export type EcommerceGetProductsGETParameters = Partial<
  {
    /** Filter by item status (`synced`/`unsynced`/`all`). If only some of the variants are synced,the product is returned by both unsynced and synced filters */
    readonly status: string;
    /** Product search needle */
    readonly search: string;
  } & PagingGETParameters
>;

/*
 * Types
 */
