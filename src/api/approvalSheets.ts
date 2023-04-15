//https://developers.printful.com/docs/#tag/Approval-Sheets-API

import {
  ApprovalSheet,
  PostRequestApproveDesignBody,
  PostRequestApproveDesignPOSTParameters,
  PostRequestApproveDesignResponse,
  PostRequestSubmitChangesBody,
  PostRequestSubmitChangesPOSTParameters,
} from '../types/approvalSheets';
import { APIFunctions, EmptyParameters } from '../types/functions';

export const getApprovalSheetsFunctions = ({ get, create }: APIFunctions) => {
  return {
    /** Retrieve a list of approval sheets confirming suggested changes to files of on hold orders. */
    listApprovalSheets: get<readonly ApprovalSheet[], EmptyParameters>(
      () => `/approval-sheets`
    ),

    /** Uses the confirm hash of an approval sheet to approve a design and remove the hold on an order */
    approveDesign: create<
      PostRequestApproveDesignResponse,
      PostRequestApproveDesignPOSTParameters,
      { readonly body: PostRequestApproveDesignBody }
    >(
      () => '/approval-sheets',
      ({ confirm_hash, ...params }) => [{ confirm_hash }, params]
    ),

    /** Use this to submit alternative changes to a design that has an approval sheet */
    submitChanges: create<
      ApprovalSheet,
      PostRequestSubmitChangesPOSTParameters,
      {
        readonly body: PostRequestSubmitChangesBody;
      }
    >(
      () => '/approval-sheets/changes',
      ({ confirm_hash, ...params }) => [{ confirm_hash }, params]
    ),
  };
};
