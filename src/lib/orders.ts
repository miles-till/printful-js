//https://developers.printful.com/docs/#tag/Orders-API
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import {
  Order,
  OrderCosts,
  OrderInput,
  OrdersGetOrdersGETParameters,
} from '../types/orders';

import { withQueryString } from './functions';

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
    /** Returns list of order objects from your store */
    listOrders: list<
      readonly Order[],
      EmptyParameters,
      OrdersGetOrdersGETParameters
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
