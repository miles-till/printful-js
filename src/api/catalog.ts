//https://developers.printful.com/docs/#tag/Catalog-API

import type {
  GetCategoryUrlParameters,
  GetProductSizeGuideQueryParameters,
  GetProductSizeGuideUrlParameters,
  GetProductUrlParameters,
  ListProductsQueryParameters,
  GetVariantUrlParameters,
  Category,
  Product,
  ProductInfo,
  ProductSizeGuide,
  VariantInfo,
} from '../types/catalog';
import type { APIFunctions, EmptyParameters } from '../types/functions';

export const getCatalogFunctions = ({ get }: APIFunctions) => {
  return {
    /** Returns list of Products available in the Printful */
    listProducts: get<
      readonly Product[],
      EmptyParameters,
      ListProductsQueryParameters
    >(() => `/products`),

    /** Returns information about a specific Variant and its Product */
    getVariant: get<VariantInfo, GetVariantUrlParameters>(
      ({ id }) => `/products/variant/${id}`
    ),

    /** Returns information about a specific product and a list of variants for this product. */
    getProduct: get<ProductInfo, GetProductUrlParameters>(
      ({ id }) => `/products/${id}`
    ),

    /** Returns information about the size guide for a specific product. */
    getProductSizeGuide: get<
      ProductSizeGuide | null,
      GetProductSizeGuideUrlParameters,
      GetProductSizeGuideQueryParameters
    >(({ id }) => `/products/${id}/sizes`),

    /** Returns list of Catalog Categories available in the Printful */
    getCategories: get<Category[]>(() => `/categories`),

    /** Returns list of Catalog Categories available in the Printful */
    getCategory: get<Category, GetCategoryUrlParameters>(
      ({ id }) => `/categories/${id}`
    ),
  };
};
