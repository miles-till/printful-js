//https://developers.printful.com/docs/#tag/Mockup-Generator-API

import type {
  APIFunctions,
  EmptyParameters,
  IDParameter,
} from '../types/functions';
import type {
  GenerationTask,
  GetRequestGenerationTaskGETParameters,
  GetRequestPrintfilesGETParameters,
  PostRequestMockupGenerationTaskBody,
  PrintfileInfo,
  ProductTemplate,
} from '../types/mockupGenerator';

export const getMockupGeneratorFunctions = ({ get, create }: Readonly<APIFunctions>) => {
  return {
    /**
     * Creates an asynchronous mockup generation task. Generation result can be retrieved using mockup generation task retrieval endpoint.
     *
     * **Rate limiting**: Up to 10 requests per 60 seconds for established stores; 2 requests per 60 seconds for new stores. Currently available rate is returned in response headers. A 60 seconds lockout is applied if request count is exceeded.
     */
    createMockupGenerationTask: create<
      GenerationTask,
      IDParameter,
      undefined,
      PostRequestMockupGenerationTaskBody
    >(({ id }) => `/mockup-generator/create-task/${id}`),

    /**
     * List of printfiles available for products variants. Printfile indicates what file resolution should be used to create a mockup or submit an order.
     *
     * *This endpoint uses DTG as a default printing technique for products with more than one technique available. For products with DTG and more techniques available please specify the correct technique in query by using the `technique` parameter. For more information read the {@link https://developers.printful.com/docs/#section/Mockup-Generator-API-examples examples}.*
     */
    retrieveProductVariantPrintfiles: get<
      PrintfileInfo,
      IDParameter,
      GetRequestPrintfilesGETParameters
    >(({ id }) => `/mockup-generator/printfiles/${id}`),

    /** Returns asynchronous mockup generation task result. If generation task is completed, it will contain a list of generated mockups. */
    getStoreInfo: get<
      GenerationTask,
      EmptyParameters,
      GetRequestGenerationTaskGETParameters
    >(() => `/mockup-generator/task`),

    /**
     * Retrieve list of templates that can be used for client-side positioning.
     *
     * *This endpoint uses DTG as a default printing technique for product layouts with more than one technique available. For products with DTG and more techniques available please specify the correct technique in query by using the `technique` parameter. For more information read the {@link https://developers.printful.com/docs/#section/Mockup-Generator-API-examples examples}.*
     */
    getLayoutTemplates: get<
      ProductTemplate,
      IDParameter,
      GetRequestPrintfilesGETParameters
    >(({ id }) => `/mockup-generator/templates/${id}`),
  };
};
