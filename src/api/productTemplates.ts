//https://developers.printful.com/docs/#tag/Product-Templates-API

import {
  APIFunctions,
  EmptyParameters,
  IDParameter,
  PagingGETParameters,
} from '../types/functions';
import { ProductTemplate } from '../types/productTemplates';

/** Template ID (integer) or External Product ID (if prefixed with @) */
type ProductTemplateID = IDParameter<number | string>;

const getProductTemplatesFunctions = ({ get, list, del }: APIFunctions) => {
  return {
    /** Returns a list of templates. */
    listProducts: list<
      readonly ProductTemplate[],
      EmptyParameters,
      PagingGETParameters
    >(
      () => `/product_templates`,
      (params) => [{}, params]
    ),

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

export default getProductTemplatesFunctions;
