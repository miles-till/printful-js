import { Response } from 'node-fetch';

import { getAPIFunctions } from '../lib/functions';

type BaseParameters = Record<string, unknown> | ReadonlyArray<unknown>;

export type UrlParameters = BaseParameters;
export type QueryParameters =
  | Record<string, string | number | boolean | undefined>
  | undefined;
export type RequestBody = BaseParameters;

export type GetEndpoint<P extends UrlParameters> = (parameters: P) => string;

export type DefaultErrorResponse = {
  readonly code: number;
  readonly result: string;
  readonly error: Record<string, string>;
};

export type SuccessResponse<R> = {
  readonly code: number;
  readonly result: R;
};

export type PagingResponse = {
  paging?: {
    /** Total number of items available */
    readonly total: number;
    /** Current result set page offset */
    readonly offset: number;
    /** Max number of items per page */
    readonly limit: number;
  };
};

export type APIResponse<R> =
  | (SuccessResponse<R> & PagingResponse)
  | DefaultErrorResponse;

export type IDParameter<T = number> = { readonly id: T };
export type EmptyParameters = Record<string, unknown>;

export type Result = Record<string, unknown> | ReadonlyArray<unknown>;

export type APIFunctions = ReturnType<typeof getAPIFunctions>;

export type ErrorHandler = (
  e: unknown
) =>
  | Record<string, unknown>
  | ReadonlyArray<unknown>
  | number
  | string
  | boolean
  | null
  | undefined;

//resolve custom user response to handler
export type ResponseHandler = <R, E>(
  fetch: () => Promise<Response>
) => Promise<R | E>;
