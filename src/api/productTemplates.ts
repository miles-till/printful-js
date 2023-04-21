//https://developers.printful.com/docs/#tag/Product-Templates-API

import type { PagingRequest } from '../types/common';
import type {
  APIFunctions,
  EmptyParameters,
  IDParameter,
} from '../types/functions';
import type { ProductTemplate } from '../types/productTemplates';

/** Template ID (integer) or External Product ID (if prefixed with @) */
type ProductTemplateID = IDParameter<number | string>;

export const getProductTemplatesFunctions = ({ get, del }: APIFunctions) => {
  return {
    /** Returns a list of templates. */
    listProducts: get<
      readonly ProductTemplate[],
      EmptyParameters,
      PagingRequest
    >(() => `/product_templates`),

    /** Get information about a single product template */
    getProduct: get<ProductTemplate, ProductTemplateID>(
      ({ id }) => `/product_templates/${id}`
    ),

    /** Delete product template by ID or External Product ID */
    deleteProduct: del<ProductTemplate, ProductTemplateID>(
      ({ id }) => `/product_templates/${id}`
    ),
  };
};
