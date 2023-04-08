//https://developers.printful.com/docs/#tag/File-Library-API

import { File, InputFile } from '../types/files';
import { APIFunctions, EmptyParameters, IDParameter } from '../types/functions';

const getFileFunctions = ({ create, get }: APIFunctions) => {
  return {
    //Add a new file
    addFile: create<File, EmptyParameters, InputFile>(
      () => `/files`,
      (params) => [{}, params]
    ),

    //Get file information
    getFile: get<File, IDParameter>(({ id }) => `/files/${id}`),
  };
};

export default getFileFunctions;
