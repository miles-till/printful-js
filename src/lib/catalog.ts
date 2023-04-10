//https://developers.printful.com/docs/#tag/Catalog-API

import {
  CatalogGetCategoryParameters,
  CatalogGetProductParameters,
  CatalogGetProductSizeGuideParameters,
  CatalogGetProductsParameters,
  CatalogGetVariantParameters,
  Category,
  Product,
  ProductInfo,
  ProductSizeGuide,
  VariantInfo,
} from '../types/catalog';
import { APIFunctions, EmptyParameters } from '../types/functions';

const getCatalogFunctions = ({ get }: APIFunctions) => {
  return {
    /** Returns list of Products available in the Printful */
    listProducts: get<readonly Product[], CatalogGetProductsParameters>(
      ({ category_id }) => {
        const path = `/products`;
        if (category_id === undefined) return path;
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

    /** Returns information about the size guide for a specific product. */
    getProductSizeGuide: get<
      ProductSizeGuide,
      CatalogGetProductSizeGuideParameters
    >(({ id, unit }) => {
      const path = `/products/${id}/sizes`;
      if (unit.length === 0) return path;
      return `${path}?unit=${unit.join(',')}`;
    }),

    /** Returns list of Catalog Categories available in the Printful */
    getCategories: get<Category[], EmptyParameters>(() => `/categories`),

    /** Returns list of Catalog Categories available in the Printful */
    getCategory: get<Category, CatalogGetCategoryParameters>(
      ({ id }) => `/categories/${id}`
    ),
  };
};

export default getCatalogFunctions;
