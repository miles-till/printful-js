//https://developers.printful.com/docs/#tag/Catalog-API

import {
  CatalogGetProductsParameters,
  Product,
  ProductInfo,
  VariantInfo,
} from '../types/catalog';
import { APIFunctions, IDParameter } from '../types/functions';

const getCatalogFunctions = ({ get }: APIFunctions) => {
  return {
    /** Returns list of Products available in the Printful */
    listProducts: get<readonly Product[], CatalogGetProductsParameters>(
      ({ category_id }) => {
        const path = `/products`;
        if (category_id.length === 0) return path;
        return `${path}?category_id=${category_id.join(',')}`;
      }
    ),

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
