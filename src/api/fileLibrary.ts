//https://developers.printful.com/docs/#tag/File-Library-API

import {
  File,
  PostRequestAvailableThreadColorsBody,
  PostRequestFileBody,
  ThreadColors,
} from '../types/fileLibrary';
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';

export const getFileLibraryFunctions = ({ create, get }: APIFunctions) => {
  return {
    /**
     * Adds a new File to the library by providing URL of the file.
     *
     * If a file with identical URL already exists, then the original file is returned. If a file does not exist, a new file is created.
     *
     * {@link https://developers.printful.com/docs/#section/File-Library-API-examples/Add-a-new-file See examples}
     */
    addFile: create<
      File,
      EmptyParameters,
      { readonly body: PostRequestFileBody }
    >(
      () => `/files`,
      (params) => [{}, params]
    ),

    /** Returns information about the given file. */
    getFile: get<File, IDParameter>(({ id }) => `/files/${id}`),

    /**
     * Returns colors in hexadecimal format.
     *
     * Returned thread colors are matched as closely as possible to provided image colors.
     *
     * {@link https://developers.printful.com/docs/#section/File-Library-API-examples/Suggest-thread-colors See examples}
     */
    availableThreadColors: create<
      ThreadColors,
      EmptyParameters,
      { readonly body: PostRequestAvailableThreadColorsBody }
    >(
      () => `/files/thread-colors`,
      (params) => [{}, params]
    ),
  };
};
