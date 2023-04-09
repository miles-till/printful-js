//https://developers.printful.com/docs/#tag/Catalog-API

import {
  CatalogGetProductParameters,
  CatalogGetProductsParameters,
  CatalogGetVariantParameters,
  Product,
  ProductInfo,
  VariantInfo,
} from '../types/catalog';
import { APIFunctions } from '../types/functions';

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

    /** Returns information about a specific Variant and its Product */
    getVariant: get<VariantInfo, CatalogGetVariantParameters>(
      ({ id }) => `/products/variant/${id}`
    ),

    /** Returns information about a specific product and a list of variants for this product. */
    getProduct: get<ProductInfo, CatalogGetProductParameters>(
      ({ id }) => `/products/${id}`
    ),
  };
};

export default getCatalogFunctions;
