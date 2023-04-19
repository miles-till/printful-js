//https://developers.printful.com/docs/#tag/Catalog-API

import {
  CatalogGetCategoryURLParameters,
  CatalogGetProductSizeGuideGETParameters,
  CatalogGetProductSizeGuideURLParameters,
  CatalogGetProductURLParameters,
  CatalogGetProductsGETParameters,
  CatalogGetVariantURLParameters,
  Category,
  Product,
  ProductInfo,
  ProductSizeGuide,
  VariantInfo,
} from '../types/catalog';
import { APIFunctions, EmptyParameters } from '../types/functions';

export const getCatalogFunctions = ({ get, list }: APIFunctions) => {
  return {
    /** Returns list of Products available in the Printful */
    listProducts: list<
      readonly Product[],
      EmptyParameters,
      undefined,
      CatalogGetProductsGETParameters
    >(() => `/products`),

    /** Returns information about a specific Variant and its Product */
    getVariant: get<VariantInfo, CatalogGetVariantURLParameters>(
      ({ id }) => `/products/variant/${id}`
    ),

    /** Returns information about a specific product and a list of variants for this product. */
    getProduct: get<ProductInfo, CatalogGetProductURLParameters>(
      ({ id }) => `/products/${id}`
    ),

    /** Returns information about the size guide for a specific product. */
    getProductSizeGuide: list<
      ProductSizeGuide,
      CatalogGetProductSizeGuideURLParameters,
      CatalogGetProductSizeGuideGETParameters
    >(({ id }) => `/products/${id}/sizes`),

    /** Returns list of Catalog Categories available in the Printful */
    getCategories: get<Category[], EmptyParameters>(() => `/categories`),

    /** Returns list of Catalog Categories available in the Printful */
    getCategory: get<Category, CatalogGetCategoryURLParameters>(
      ({ id }) => `/categories/${id}`
    ),
  };
};
