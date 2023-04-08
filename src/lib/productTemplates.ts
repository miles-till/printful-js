//https://developers.printful.com/docs/#tag/Product-Templates-API
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';
import { ProductTemplate } from '../types/productTemplate';

type ProductTemplateID = IDParameter<number | string>;

const getProductTemplateFunctions = ({ get, list, del }: APIFunctions) => {
  return {
    //Get a list of Product Templates
    listProducts: list<
      readonly ProductTemplate[],
      EmptyParameters,
      Partial<{
        readonly offset: number;
        readonly limit: number;
      }>
    >(
      () => `/product_templates`,
      (params) => [{}, params]
    ),

    //Get information about a single Product Template
    getProduct: get<ProductTemplate, ProductTemplateID>(
      ({ id }) => `/product_templates/${id}`
    ),

    //Delete a Product Template
    deleteProduct: del<ProductTemplate, ProductTemplateID>(
      ({ id }) => `/product_templates/${id}`
    ),
  };
};

export default getProductTemplateFunctions;
