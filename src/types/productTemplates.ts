import type { Color, ItemOption, Placement } from './common';

export type ProductTemplate = {
  readonly id: number;
  readonly product_id: number;
  readonly external_product_id: string;
  readonly title: string;
  readonly available_variant_ids: number[];
  readonly option_data: ItemOption[];
  readonly colors: Color[];
  readonly sizes: string[];
  readonly mockup_file_url: string;
  readonly placements: Placement[];
  readonly created_at: number;
  readonly updated_at: number;
  readonly placement_option_data: ItemOption[];
};
