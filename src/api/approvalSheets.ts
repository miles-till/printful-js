//https://developers.printful.com/docs/#tag/Approval-Sheets-API

import type {
  ApprovalSheet,
  ApproveDesignQueryParameters,
  ApproveDesignRequestBody,
  ApproveDesignResponse,
  SubmitChangesQueryParameters,
  SubmitChangesRequestBody,
} from '../types/approvalSheets';
import type { APIFunctions, EmptyParameters } from '../types/functions';

export const getApprovalSheetsFunctions = ({
  get,
  create,
}: Readonly<APIFunctions>) => {
  return {
    /** Retrieve a list of approval sheets confirming suggested changes to files of on hold orders. */
    listApprovalSheets: get<readonly ApprovalSheet[]>(() => `/approval-sheets`),

    /** Uses the confirm hash of an approval sheet to approve a design and remove the hold on an order */
    approveDesign: create<
      ApproveDesignResponse,
      EmptyParameters,
      ApproveDesignQueryParameters,
      ApproveDesignRequestBody
    >(() => '/approval-sheets'),

    /** Use this to submit alternative changes to a design that has an approval sheet */
    submitChanges: create<
      ApprovalSheet,
      EmptyParameters,
      SubmitChangesQueryParameters,
      SubmitChangesRequestBody
    >(() => '/approval-sheets/changes'),
  };
};
