//https://developers.printful.com/docs/#tag/Catalog-API

import { Product, ProductInfo, VariantInfo } from '../types/catalog';
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';

const getCatalogFunctions = ({ get }: APIFunctions) => {
  return {
    //Get all Product list
    listProducts: get<readonly Product[], EmptyParameters>(() => `/products`),

    //Get information about Variant
    getVariant: get<VariantInfo, IDParameter>(
      ({ id }) => `/products/variant/${id}`
    ),

    //Get Product's Variant list
    getProductVariants: get<ProductInfo, IDParameter>(
      ({ id }) => `/products/${id}`
    ),
  };
};

export default getCatalogFunctions;
