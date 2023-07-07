//https://developers.printful.com/docs/#tag/Warehouse-Products-API

import type {
  APIFunctions,
  EmptyParameters,
  IDParameter,
} from '../types/functions';
import type {
  ListWarehouseProductsQueryParameters,
  WarehouseProduct,
} from '../types/warehouseProducts';

/** Product ID */
type WarehouseProductID = IDParameter<number | string>;

export const getWarehouseProductsFunctions = ({
  get,
}: Readonly<APIFunctions>) => {
  return {
    /** Returns a list of warehouse products from your store */
    listWarehouseProducts: get<
      readonly WarehouseProduct[],
      EmptyParameters,
      ListWarehouseProductsQueryParameters
    >(() => `/warehouse/products`),

    /** Returns warehouse product data by ID */
    getWarehouseProduct: get<WarehouseProduct, WarehouseProductID>(
      ({ id }) => `/warehouse/products/${id}`
    ),
  };
};
