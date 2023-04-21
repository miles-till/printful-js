/*
 * Request parameters
 */

export type GetStatisticsQueryParameters = {
  /**
   * Example: `date_from=2022-08-01`
   *
   * The beginning of the period to get the statistics from (date in `Y-m-d` format).
   */
  readonly date_from: string;
  /**
   * Example: `date_to=2022-08-31`
   *
   * The end of the period to get the statistics from (date in `Y-m-d` format).
   */
  readonly date_to: string;
  /**
   * Example: `currency=USD`
   *
   * The currency (3-letter code) to return the statistics in. You can also specify `display_currency` as the value to get the statistics in the account's display currency. The store currency will be used by default.
   */
  readonly currency?: string;
  /**
   * Example: `report_types=sales_and_costs,profit`
   *
   * A comma-separated list of report types to be retrieved.
   *
   * Currently, the following report types are available:
   *
   * | Report type                | Description |
   * | :------------------------- | :---------- |
   * | `sales_and_costs`          | Detailed information on sales and costs grouped by date. |
   * | `sales_and_costs_summary`  | Short information on sales and costs grouped by date. |
   * | `printful_costs`           | Amount paid to Printful for fulfillment and shipping. |
   * | `profit`                   | Profit in the specified period. |
   * | `total_paid_orders`        | The number of paid orders in the specified period. |
   * | `costs_by_amount`          | Information on costs by amount grouped by date. |
   * | `costs_by_product`         | Information on costs grouped by product. |
   * | `costs_by_variant`         | Information on costs grouped by variant. |
   * | `average_fulfillment_time` | Average time it took Printful to fulfill Your orders. |
   *
   * The response structure for the specific reports is documented in the response schema (result.store_statistics.[reportName]).
   */
  readonly report_types: string;
};

/*
 * Types
 */

export type Statistics = {
  readonly store_statistics: readonly StoreStatistics[];
};

type StoreStatistics = {
  /** The ID of the store for which the statistics are returned */
  store_id: number;
  /** The code of the currency in which the statistics are returned */
  currency: string;
  /** Sales and costs report */
  sales_and_costs?: SalesAndCostsValue[];
  /** Sales and costs summary report */
  sales_and_costs_summary?: SalesAndCostsSummaryValue[];
  /** Printful costs report */
  printful_costs?: PrintfulCosts;
  /** Profit report */
  profit?: Profit;
  /** Total paid orders report */
  total_paid_orders?: TotalPaidOrders;
  /** Costs by amount report */
  costs_by_amount?: CostsByAmountValue[];
  /** Costs by product report */
  costs_by_product?: CostsByProductValue[];
  /** Costs by variant report */
  costs_by_variant?: CostsByVariantValue[];
  /** Average fulfillment time report */
  average_fulfillment_time?: AverageFulfillmentTime;
};

type SalesAndCostsValue = {
  /** The date of the value: day in `Y-m-d` format, month in `Y-m` format or "Total" for the first element of the list which shows the total values for the whole requested period */
  date: string;
  /** Order retail price data. Available only if retail price fields are properly set up on the integration's side */
  sales: number;
  /** Product fulfillment, digitization, branding, shipping costs and taxes that are charged by Printful */
  fulfillment: number;
  /** The difference between Sales and Fulfillment. If retail price data is not available, profit might be negative */
  profit: number;
  /** Any retail price discounts set up on the integration's side */
  sales_discount: number;
  /** Any fulfillment discounts (such as the monthly discount) set up on Printful's side */
  fulfillment_discount: number;
  /** The retail shipping price that was paid by the buyer */
  sales_shipping: number;
  /** Shipping costs that were charged by Printful */
  fulfillment_shipping: number;
};

type SalesAndCostsSummaryValue = {
  /** The date of the value: day in `Y-m-d` format, month in `Y-m` format or "Total" for the first element of the list which shows the total values for the whole requested period */
  date: string;
  /** The order count in the aggregation period */
  order_count: number;
  /** Product fulfillment, digitization, branding, shipping costs and taxes that are charged by Printful */
  costs: number;
  /** The difference between Sales and Fulfillment. If retail price data is not available, profit might be negative */
  profit: number;
};

type PrintfulCosts = {
  /** Amount paid to Printful for fulfillment and shipping. */
  value: number;
  /** Relative difference from the value from the previous period. -1 means 100% decrease, 1 means 100% increase. 0 is returned if there is no change or the previous value was 0. */
  relative_difference: number;
};

type Profit = {
  /** The difference between Sales and Fulfillment. If retail price data is not available, profit might be negative */
  value: number;
  /** Relative difference from the value from the previous period. -1 means 100% decrease, 1 means 100% increase. 0 is returned if there is no change or the previous value was 0. */
  relative_difference: number;
};

type TotalPaidOrders = {
  /** Number of unique orders for period */
  value: number;
  /** Relative difference from the value from the previous period. -1 means 100% decrease, 1 means 100% increase. 0 is returned if there is no change or the previous value was 0. */
  relative_difference: number;
};

type CostsByAmountValue = {
  /** The date of the value: day in `Y-m-d` format, month in `Y-m` format or "Total" for the first element of the list which shows the total values for the whole requested period */
  date: string;
  /** Product & fulfillment costs */
  product_amount: number;
  /** Embroidery digitization costs */
  digitization: number;
  /** Pack-in costs */
  branding: number;
  /** Tax amounts. If not applicable, it will be 0. */
  vat: number;
  /** Tax amounts. If not applicable, it will be 0. */
  sales_tax: number;
  /** Shipping costs that were charged by Printful */
  shipping: number;
  /** Any fulfillment discounts (such as the monthly discount) set up on Printful's side */
  discount: number;
  /** Summary of all costs */
  total: number;
};

type CostsByProductValue = {
  /** Product ID. See {@link https://developers.printful.com/docs/#tag/Catalog-API Catalog API}. */
  product_id: number;
  /** Product name. */
  product_name: string;
  /** All fulfillment costs that are charged by Printful, excluding shipping. */
  fulfillment: number;
  /** Order retail price data. Available only if retail price fields are properly set up on the integration's side. */
  sales: number;
  /** Total quantity of items ordered from this product in the selected period. */
  quantity: number;
};

type CostsByVariantValue = {
  /** Variant ID. See {@link https://developers.printful.com/docs/#tag/Catalog-API Catalog API}. */
  variant_id: number;
  /** Variant name. */
  variant_name: string;
  /** Product ID. See {@link https://developers.printful.com/docs/#tag/Catalog-API Catalog API}. */
  product_id: number;
  /** All fulfillment costs that are charged by Printful, excluding shipping. */
  fulfillment: number;
  /** Order retail price data. Available only if retail price fields are properly set up on the integration's side. */
  sales: number;
  /** Total quantity of items ordered from this product in the selected period. */
  quantity: number;
};

type AverageFulfillmentTime = {
  /** Average time it took Printful to fulfill Your orders. */
  value: number;
  /** Relative difference from the value from the previous period. -1 means 100% decrease, 1 means 100% increase. 0 is returned if there is no change or the previous value was 0. */
  relative_difference: number;
};
