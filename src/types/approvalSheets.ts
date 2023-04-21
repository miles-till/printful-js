/*
 * Request parameters
 */

export type ApproveDesignQueryParameters = ConfirmHash;

export type ApproveDesignRequestBody = {
  /** Value: `"approved"` */
  readonly status: 'approved';
};

export type ApproveDesignResponse = {
  readonly message: string;
};

export type SubmitChangesQueryParameters = ConfirmHash;

export type SubmitChangesRequestBody = {
  /** A message to send to Printful designers. Customers should use this to describe the changes they want. */
  readonly message: string;
  /** An array of images to help describe the requested changes. Consider using the mockup generator to generate these images. The array is required but can be empty if you do not want to email any images. */
  readonly files: readonly ApprovalFile[];
};

type ConfirmHash = {
  /**
   * Example: `confirm_hash=a14e51714be01f98487fcf5131727d31`
   *
   * The confirm hash for the approval sheet you would like to approve.
   */
  readonly confirm_hash: string;
};

/*
 * Types
 */

export type ApprovalSheet = {
  id: number;
  /** Enum: "waiting_for_action" "approved" */
  status: ApprovalSheetStatus;
  confirm_hash: string;
  submitted_design: string;
  recommended_design: string;
  approval_sheet: string;
};

type ApprovalSheetStatus = 'waiting_for_action' | 'approved';

export type ApprovalFile = {
  /** A url to an image, consider using the mockup generator to generate this image. */
  readonly url: string;
};
