/*
 * Request parameters
 */

/*
 * Types
 */

export type Country = {
  /** Country code */
  readonly code: string;
  /** Country name */
  readonly name: string;
  readonly states: readonly State[];
  readonly region: string;
};

export type State = {
  /** State code */
  readonly code: string;
  /** State name */
  readonly name: string;
};
