//https://developers.printful.com/docs/#tag/Warehouse-Products-API

import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import {
  GetRequestWarehouseProductsGETParameters,
  WarehouseProduct,
} from '../types/warehouseProducts';

/** Product ID */
type WarehouseProductID = IDParameter<number | string>;

export const getWarehouseProductsFunctions = ({ get, list }: APIFunctions) => {
  return {
    /** Returns a list of warehouse products from your store */
    listWarehouseProducts: list<
      readonly WarehouseProduct[],
      EmptyParameters,
      GetRequestWarehouseProductsGETParameters
    >(
      () => `/warehouse/products`,
      (params) => [{}, params]
    ),

    /** Returns warehouse product data by ID */
    getWarehouseProduct: get<WarehouseProduct, WarehouseProductID>(
      ({ id }) => `/warehouse/products/${id}`
    ),
  };
};
