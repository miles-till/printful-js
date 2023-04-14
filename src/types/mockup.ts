import { PropertyMap } from './common';

/*
 * Request parameters
 */

export type PostRequestMockupGenerationTaskBody = {};

export type GetRequestPrintfilesGETParameters = Partial<{
  /**
   * Enum: "horizontal" "vertical"
   *
   * Optional orientation for wall art product printfiles. Allowed values: horizontal, vertical
   */
  readonly orientation: 'horizontal' | 'vertical';
  /** Optional technique for product. This can be used in cases where product supports multiple techniques like DTG and embroidery */
  readonly technique: string;
}>;

export type GetRequestGenerationTaskGETParameters = {
  /** Task key retrieved when creating the generation task. */
  readonly task_key: string;
};

/*
 * Types
 */

export type GenerationTask = {
  /** Task identifier you will use to retrieve generated mockups. */
  readonly task_key: string;
  /**
   * Enum: "pending" "completed" "failed"
   *
   * Status of the generation task.
   */
  readonly status: string;
  /** If task has failed, reason will be provided here. */
  readonly error: string;
  /** If task is completed, list of mockups will be provided here. */
  readonly mockups: readonly GenerationTaskMockup[];
  /** If task is completed, list of printfiles will be provided here. */
  readonly printfiles: readonly GenerationTaskTemplateFile[];
};

type GenerationTaskMockup = {
  /** Placement identifier. */
  readonly placement: string;
  /** List of variant ids this mockup is used for. One mockup can be used for multiple variants. */
  readonly variant_ids: readonly number[];
  /** Temporary URL of the primary mockup. */
  readonly mockup_url: string;
  /** Optional extra mockups. */
  readonly extra: readonly GenerationTaskExtraMockup[];
};

type GenerationTaskExtraMockup = {
  /** Display name of the extra mockup. */
  readonly title: string;
  /** Temporary URL of the mockup. */
  readonly url: string;
  /** Style option name */
  readonly option: string;
  /** Style option group name */
  readonly option_group: string;
};

type GenerationTaskTemplateFile = {
  /** List of variant IDs associated with printfiles. */
  readonly variant_ids: readonly number[];
  /** Placement identifier (front, back, etc.). */
  readonly placement: string;
  /** Public URL where your file is stored. */
  readonly url: string;
};

export type PrintfileInfo = {
  /** Requested product id. */
  readonly product_id: number;
  /** List of available placements. Key is placement identifier, value is display name. (e.g. {embroidery_front: Front, ..}). */
  readonly available_placements: PropertyMap;
  readonly printfiles: readonly Printfile[];
  readonly variant_printfiles: readonly VariantPrintfile[];
  readonly option_groups: readonly string[];
  readonly options: readonly string[];
};

type Printfile = {
  /** Unique printfile identifier. */
  readonly printfile_id: number;
  /** Width in pixels. */
  readonly width: number;
  /** Height in pixels. */
  readonly height: number;
  /** Resulting DPI for given width and height. */
  readonly dpi: number;
  /**
   * Enum: "cover" "fit"
   *
   * Indicates if printfile will be used in cover or fit mode. Cover mode can produce cropping if side ratio does not match printfile.
   */
  readonly fill_mode: string;
  /** Indicates if printfile can be rotated horizontally (e.g. for posters). */
  readonly can_rotate: boolean;
};

type VariantPrintfile = {
  readonly variant_id: number;
  /** A key-value object mapping placement identifiers to printfile IDs. */
  readonly placements: PropertyMap;
};

export type ProductTemplate = {
  /** Resource version. If this changes, resources (positions, images, etc.) should be re-cached. */
  readonly version: number;
  /** Recommended minimum DPI for given product. */
  readonly min_dpi: number;
  /** List of product variants mapped to templates. From this information you can determine which template should be used for a variant. */
  readonly variant_mapping: readonly TemplateVariantMapping[];
  /** List of templates. Use variant_mapping to determine which template corresponds to which product variant. */
  readonly templates: readonly Template[];
  /** List of conflicting placements. Used to determine which placements can be used together. */
  readonly conflicting_placements: readonly TemplatePlacementConflict[];
};

type TemplateVariantMapping = {
  /** Product variant ID. */
  readonly variant_id: number;
  /** Array of Template Variant Mapping items */
  readonly templates: readonly TemplateVariantMappingItem[];
};

type TemplateVariantMappingItem = {
  /** Placement ID. */
  readonly placement: string;
  /** Corresponding template id which should be used for this variant and placement combination. */
  readonly template_id: number;
};

type Template = {
  /** Template ID. */
  readonly template_id: number;
  /** Main template image URL. */
  readonly image_url: string;
  /** Background image URL (optional). */
  readonly background_url: string | null;
  /** HEX color code that should be used as a background color. */
  readonly background_color: number | null;
  /** Printfile ID that should be generated for this template. See printfile API endpoint for list of Printfiles. */
  readonly printfile_id: number;
  /** Width of the whole template in pixels. */
  readonly template_width: number;
  /** Height of the whole template in pixels. */
  readonly template_height: number;
  /** Print area width (image is positioned in this area). */
  readonly print_area_width: number;
  /** Print area height (image is positioned in this area). */
  readonly print_area_height: number;
  /** Print area top offset (offset in template). */
  readonly print_area_top: number;
  /** Print area left offset (offset in template). */
  readonly print_area_left: number;
  /** Should the main template image (image_url) be used as an overlay or as a background. */
  readonly is_template_on_front: boolean;
  /**
   * Enum: `"horizontal"` `"vertical"` `"any"`
   *
   * Wall art product orientation. Possible values: horizontal, vertical, any
   */
  readonly orientation: 'horizontal' | 'vertical' | 'any';
};

type TemplatePlacementConflict = {
  /** Placement ID */
  readonly placement: string;
  /** List Placement IDs that are conflicting with given placement */
  readonly conflicts: readonly string[];
};
