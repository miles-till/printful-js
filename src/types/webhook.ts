import type { PropertyMap } from './common';

/*
 * Request parameters
 */

export type SetupWebhookConfigRequestBody = WebhookInfo;

/*
 * Types
 */

export type WebhookInfo = {
  /** Webhook URL that will receive store's event notifications */
  readonly url: string;
  /** Array of enabled webhook event types */
  readonly types: readonly string[];
  readonly params: PropertyMap;
};
