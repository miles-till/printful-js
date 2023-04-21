//https://developers.printful.com/docs/#tag/Orders-API

import type { APIFunctions, EmptyParameters } from '../types/functions';
import type {
  Order,
  OrderCosts,
  OrderID,
  ListOrdersQueryParameters,
  CreateOrderQueryParameters,
  UpdateOrderQueryParameters,
  CreateOrderRequestBody,
  UpdateOrderRequestBody,
  EstimateOrderRequestBody,
} from '../types/orders';

export const getOrdersFunctions = ({
  get,
  create,
  del,
  update,
}: APIFunctions) => {
  return {
    /** Returns list of order objects from your store */
    listOrders: get<
      readonly Order[],
      EmptyParameters,
      ListOrdersQueryParameters
    >(() => `/orders`),

    /** Creates a new order and optionally submits it for fulfillment ({@link https://developers.printful.com/docs/#section/Orders-API-examples See examples}) */
    createOrder: create<
      Order,
      EmptyParameters,
      CreateOrderQueryParameters,
      CreateOrderRequestBody
    >(() => `/orders`),

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
      OrderID,
      UpdateOrderQueryParameters,
      UpdateOrderRequestBody
    >(({ id }) => `orders/${id}`),

    /** Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment. */
    confirmDraft: create<Order, OrderID>(({ id }) => `/orders/${id}/confirm`),

    /** Calculates the estimated order costs including item costs, print costs (back prints, inside labels etc.), shipping and taxes */
    estimateOrder: create<
      OrderCosts,
      EmptyParameters,
      undefined,
      EstimateOrderRequestBody
    >(() => `/orders/estimate-costs`),
  };
};
