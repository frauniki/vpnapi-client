import axios, { AxiosInstance, isAxiosError } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import axiosRetry, { IAxiosRetryConfig } from "axios-retry";

import { VpnApiError } from "./error";
import { VpnApiErrorResponse, VpnApiResponse } from "./type";

const DEFAULT_API_URL = "https://vpnapi.io/api";

export class VpnApiClient {
  private axios: AxiosInstance;

  constructor(
    key: string,
    options: {
      apiUrl?: string;
      timeout?: number;
      retryConfig?: IAxiosRetryConfig;
    } = {
      apiUrl: DEFAULT_API_URL,
      timeout: 1000,
    },
  ) {
    this.axios = applyCaseMiddleware(
      axios.create({
        baseURL: options.apiUrl,
        params: { key },
        timeout: options.timeout,
      }),
    );
    axiosRetry(this.axios, options.retryConfig);
  }

  async getIpInfo(ip: string): Promise<VpnApiResponse> {
    let data: VpnApiResponse | VpnApiErrorResponse | undefined = undefined;

    try {
      ({ data } = await this.axios.get<VpnApiResponse | VpnApiErrorResponse>(
        `/${ip}`,
      ));
    } catch (err) {
      if (isAxiosError(err)) {
        throw new VpnApiError(err.message, err);
      }
    }

    if (!data) {
      throw new VpnApiError("No response data");
    }
    if ("message" in data) {
      throw new VpnApiError(data.message);
    }
    return data;
  }
}
