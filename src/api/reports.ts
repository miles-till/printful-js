//https://developers.printful.com/docs/#tag/Reports-API

import type { APIFunctions, EmptyParameters } from '../types/functions';
import type {
  GetStatisticsQueryParameters,
  Statistics,
} from '../types/reports';

export const getReportsFunctions = ({ get }: APIFunctions) => {
  return {
    /**
     * Returns statistics for specified report types.
     *
     * You need to specify the report types you want to retrieve in the `report_types` query parameter as a comma-separated list, e.g. `report_types=sales_and_costs,profit`.
     *
     * **Note**: You cannot get statistics for a period longer than 6 months.
     */
    getStatistics: get<
      Statistics,
      EmptyParameters,
      GetStatisticsQueryParameters
    >(() => `/reports/statistics`),
  };
};
