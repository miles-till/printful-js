//https://developers.printful.com/docs/#tag/Webhook-API

import { APIFunctions, EmptyParameters } from '../types/functions';
import { WebhookInfo } from '../types/webhooks';

const getWebhookFunctions = ({ get, create, del }: APIFunctions) => {
  return {
    //Get webhook configuration
    getWebhookConfig: get<WebhookInfo, EmptyParameters>(() => `/webhooks`),

    //Set up webhook configuration
    setupWebhookConfig: create<
      WebhookInfo,
      EmptyParameters,
      { readonly body: WebhookInfo }
    >(
      () => `/webhooks`,
      (params) => [{}, params]
    ),

    //Disable webhook support
    disableWebhookSupport: del<WebhookInfo, EmptyParameters>(() => `/webhooks`),
  };
};

export default getWebhookFunctions;
