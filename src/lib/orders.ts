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

import { withQueryString } from './functions';

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

    //Estimate order costs (probably not create but its that kind of strict interface. we not showing that. if the server doesn't persist it, its its decision)
    estimateOrder: create<
      OrderCosts,
      EmptyParameters,
      { readonly body: PostRequestOrderBody }
    >(
      () => `/orders/estimate-costs`,
      (params) => [{}, params]
    ),

    //Confirm draft for fulfillment
    confirmDraft: create<Order, OrderID, EmptyParameters>(
      ({ id }) => `/orders/${id}/confirm`,
      (params) => [params, {}]
    ),
  };
};

export default getOrderFunctions;
