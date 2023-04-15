//https://developers.printful.com/docs/#tag/Warehouse-Products-API

import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import {
  GetRequestWarehouseProductsGETParameters,
  WarehouseProduct,
} from '../types/warehouse_products';

/** Product ID */
type WarehouseProductID = IDParameter<number | string>;

const getWarehouseProductFunctions = ({ get, list }: APIFunctions) => {
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

export default getWarehouseProductFunctions;
