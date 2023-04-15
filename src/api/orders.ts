//https://developers.printful.com/docs/#tag/Orders-API

import { APIFunctions, EmptyParameters } from '../types/functions';
import {
  Order,
  OrderCosts,
  OrderID,
  OrdersGetOrdersGETParameters,
  OrdersPostOrderPOSTParameters,
  OrdersPutOrderPUTParameters,
  PostRequestOrderBody,
} from '../types/orders';
import { withQueryString } from '../lib/functions';

const getOrdersFunctions = ({
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

    /** Creates a new order and optionally submits it for fulfillment ({@link https://developers.printful.com/docs/#section/Orders-API-examples See examples}) */
    createOrder: create<
      Order,
      OrdersPostOrderPOSTParameters,
      { readonly body: PostRequestOrderBody }
    >(
      (qsParams) => withQueryString(`/orders`, qsParams),
      ({ body, ...qsParams }) => [qsParams, { body }]
    ),

    /** Returns order data by ID or External ID. */
    getOrderData: get<Order, OrderID>(({ id }) => `/orders/${id}`),

    /** Cancels pending order or draft. Charged amount is returned to the store owner's credit card. */
    cancelOrder: del<Order, OrderID>(({ id }) => `/orders/${id}`),

    /**
     * Updates unsubmitted order and optionally submits it for the fulfillment.
     *
     * Note that you need to post only the fields that need to be changed, not all required fields.
     *
     * If items array is given in the update data, the items will be:
     *
     * a) updated, if the update data contains the item id or external_id parameter that alreay exists
     *
     * b) deleted, if the request doesn't contain the item with previously existing id
     *
     * c) created as new if the id is not given or does not already exist
     */
    updateOrder: update<
      Order,
      OrdersPutOrderPUTParameters,
      { readonly body: PostRequestOrderBody }
    >(
      ({ id, confirm }) => withQueryString(`orders/${id}`, { confirm }),
      ({ body, ...urlParams }) => [urlParams, { body }]
    ),

    /** Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment. */
    confirmDraft: create<Order, OrderID, EmptyParameters>(
      ({ id }) => `/orders/${id}/confirm`,
      (params) => [params, {}]
    ),

    /** Calculates the estimated order costs including item costs, print costs (back prints, inside labels etc.), shipping and taxes */
    estimateOrder: create<
      OrderCosts,
      EmptyParameters,
      { readonly body: PostRequestOrderBody }
    >(
      () => `/orders/estimate-costs`,
      (params) => [{}, params]
    ),
  };
};

export default getOrdersFunctions;
