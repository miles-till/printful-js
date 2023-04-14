//https://developers.printful.com/docs/#tag/Webhook-API

import { APIFunctions, EmptyParameters } from '../types/functions';
import { WebhookInfo } from '../types/webhooks';

const getWebhookFunctions = ({ get, create, del }: APIFunctions) => {
  return {
    /** Returns configured webhook URL and list of webhook event types enabled for the store */
    getWebhookConfig: get<WebhookInfo, EmptyParameters>(() => `/webhooks`),

    /**
     * Allows to enable webhook URL for the store and select webhook event types that will be sent to this URL.
     *
     * Note that only one webhook URL can be active for a store, so calling this method disables all existing webhook configuration.
     *
     * Setting up the Stock updated webhook requires passing IDs for products that need to be monitored for changes. Stock update webhook will only include information for specified products. These product IDs need to be set up using params property.
     *
     * Method returns current webhook configuration after the update.
     */
    setupWebhookConfig: create<
      WebhookInfo,
      EmptyParameters,
      { readonly body: WebhookInfo }
    >(
      () => `/webhooks`,
      (params) => [{}, params]
    ),

    /**
     * Removes the webhook URL and all event types from the store.
     *
     * Method returns current webhook configuration after the update.
     */
    disableWebhookSupport: del<WebhookInfo, EmptyParameters>(() => `/webhooks`),
  };
};

export default getWebhookFunctions;
