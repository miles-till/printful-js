//https://developers.printful.com/docs/#tag/Warehouse-Shipments-API

import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import {
  WarehouseShipment,
  WarehouseShipmentCreate,
} from '../types/warehouse_shipments';

const getWarehouseShipmentFunctions = ({ get, list, create }: APIFunctions) => {
  return {
    //Get a list of your warehouse shipments @https://www.printful.com/docs/warehouse-shipments#actionIndex
    listWarehouseShipments: list<
      readonly WarehouseShipment[],
      EmptyParameters,
      {
        readonly status: WarehouseShipment['status'];
        readonly offset: number;
        readonly limit: number;
      }
    >(
      () => `/warehouse/shipments`,
      (params) => [{}, params]
    ),

    //Create new warehouse shipment @https://www.printful.com/docs/warehouse-shipments#actionCreate
    createWarehouseProduct: create<
      WarehouseShipment,
      EmptyParameters,
      WarehouseShipmentCreate
    >(
      () => `/warehouse/shipments`,
      (params) => [{}, params]
    ),

    //Get warehouse shipment data @https://www.printful.com/docs/warehouse-shipments#actionGet
    getWarehouseProduct: get<WarehouseShipment, IDParameter<number | string>>(
      ({ id }) => `/warehouse/shipments/${id}`
    ),
  };
};

export default getWarehouseShipmentFunctions;
