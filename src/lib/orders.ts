//https://developers.printful.com/docs/#tag/Orders-API
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import { Order, OrderCosts, OrderInput } from '../types/orders';

import { withQueryString } from './functions';

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
type Status =
  | 'draft'
  | 'pending'
  | 'failed'
  | 'canceled'
  | 'inprocess'
  | 'onhold'
  | 'partial'
  | 'fulfilled'
  | 'archived';

/** Order ID (integer) or External ID (if prefixed with @) */
type OrderID = IDParameter<number | string>;

const getOrderFunctions = ({
  list,
  create,
  get,
  del,
  update,
}: APIFunctions) => {
  return {
    //Get list of orders
    listOrders: list<
      readonly Order[],
      EmptyParameters,
      {
        readonly status: Status;
        readonly offset: number;
        readonly limit: number;
      }
    >(
      () => `/orders`,
      (params) => [{}, params]
    ),

    //Create a new order
    createOrder: create<
      Order,
      Partial<{ readonly confirm: boolean; readonly update_existing: boolean }>,
      { readonly body: OrderInput }
    >(
      (qsParams) => withQueryString(`/orders`, qsParams),
      ({ body, ...qsParams }) => [qsParams, { body }]
    ),

    //Estimate order costs (probably not create but its that kind of strict interface. we not showing that. if the server doesn't persist it, its its decision)
    estimateOrder: create<
      OrderCosts,
      EmptyParameters,
      { readonly body: OrderInput }
    >(
      () => `/orders/estimate-costs`,
      (params) => [{}, params]
    ),

    //Get order data
    getOrderData: get<Order, OrderID>(({ id }) => `/orders/${id}`),

    //Cancel an order
    cancelOrder: del<Order, OrderID>(({ id }) => `/orders/${id}`),

    //Update order data
    updateOrder: update<
      Order,
      OrderID & { readonly confirm: boolean },
      { readonly body: OrderInput }
    >(
      ({ id, confirm }) => withQueryString(`orders/${id}`, { confirm }),
      ({ body, ...urlParams }) => [urlParams, { body }]
    ),

    //Confirm draft for fulfillment
    confirmDraft: create<Order, OrderID, EmptyParameters>(
      ({ id }) => `/orders/${id}/confirm`,
      (params) => [params, {}]
    ),
  };
};

export default getOrderFunctions;
