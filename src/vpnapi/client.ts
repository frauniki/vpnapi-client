import axios, { AxiosInstance } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { VpnApiErrorResponse, VpnApiResponse } from "./type";
import { VpnApiError } from "./error";

const DEFAULT_API_URL = "https://vpnapi.io/api";

export class VpnApiClient {
  private axios: AxiosInstance;

  constructor(
    key: string,
    options: { apiUrl?: string; timeout?: number } = {
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
  }

  async getIpInfo(ip: string): Promise<VpnApiResponse> {
    const { data } = await this.axios.get<VpnApiResponse | VpnApiErrorResponse>(
      `/${ip}`,
    );
    if ("message" in data) {
      throw new VpnApiError(data.message);
    }
    return data;
  }
}
