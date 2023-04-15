import { Timestamp, ValueType } from './common';
import { RequireOnly } from './util';

/*
 * Request parameters
 */

export type PostRequestFileBody = RequireOnly<
  Pick<File, 'type' | 'url' | 'options' | 'filename' | 'visible'>,
  'url'
>;

export type PostRequestAvailableThreadColorsBody = {
  /** URL to file */
  file_url: string;
};

/*
 * Types
 */

export type File = {
  /** Role of the file */
  readonly type: string;
  /** File ID */
  readonly id: number;
  /** Source URL where the file is downloaded from */
  readonly url: string;
  /**
   * Array of additional options for this file
   *
   * {@link https://developers.printful.com/docs/#section/Options See examples}
   */
  readonly options: readonly FileOption[];
  /** MD5 checksum of the file */
  readonly hash: string;
  /** File name */
  readonly filename: string;
  /** MIME type of the file */
  readonly mime_type: string;
  /** Size in bytes */
  readonly size: number;
  /** Width in pixels */
  readonly width: number;
  /** Height in pixels */
  readonly height: number;
  /**
   * Resolution DPI.
   *
   * **Note:** for vector files this may be indicated as only 72dpi, but it doesn't affect print quality since the vector files are resolution independent.
   */
  readonly dpi: number;
  /**
   * File processing status:
   *
   * **ok** - file was processed successfuly
   *
   * **waiting** - file is being processed
   *
   * **failed** - file failed to be processed
   */
  readonly status: FileStatus;
  /** File creation timestamp */
  readonly created: Timestamp;
  /** Small thumbnail URL */
  readonly thumbnail_url: string;
  /** Medium preview image URL */
  readonly preview_url: string;
  /** Show file in the Printfile Library (default true) */
  readonly visible: boolean;
  /** Whether it is a temporary printfile. */
  readonly is_temporary: boolean;
};

/** File processing status:
 *
 * **ok** - file was processed successfuly
 *
 * **waiting** - file is being processed
 *
 * **failed** - file failed to be processed
 */
type FileStatus = 'ok' | 'waiting' | 'failed';

export type FileOption = {
  /** Option id */
  readonly id: string;
  /** Option value */
  readonly value: ValueType;
};

export type ThreadColors = string[];
