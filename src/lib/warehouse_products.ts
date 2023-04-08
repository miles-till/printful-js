//https://developers.printful.com/docs/#tag/Warehouse-Products-API

import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import { WarehouseProduct } from '../types/warehouse_products';

const getWarehouseProductFunctions = ({ get, list, create }: APIFunctions) => {
  return {
    //Get a list of your warehouse products
    //@see https://www.printful.com/docs/warehouse-products#actionCreate
    listWarehouseProducts: list<
      readonly WarehouseProduct[],
      EmptyParameters,
      { readonly offset: number; readonly limit: number }
    >(
      () => `/warehouse/products`,
      (params) => [{}, params]
    ),

    //Create a new warehouse product
    //terms_accepted doesn't seem to be sent? ignore for now
    createWarehouseProduct: create<
      WarehouseProduct,
      EmptyParameters,
      WarehouseProduct
    >(
      () => `/store/packing-slip`,
      (params) => [{}, params]
    ),

    //Get warehouse product data
    getWarehouseProduct: get<WarehouseProduct, IDParameter<number | string>>(
      ({ id }) => `/warehouse/products/${id}`
    ),
  };
};

export default getWarehouseProductFunctions;
