import { beforeAll, describe, expect, it } from "vitest";

import { VpnApiClient } from "./client";

let client: VpnApiClient;

beforeAll(() => {
  const TEST_API_KEY = process.env.TEST_API_KEY;
  if (!TEST_API_KEY) {
    throw new Error("TEST_API_KEY is required");
  }

  client = new VpnApiClient(TEST_API_KEY);
});

describe("VpnApiClient", () => {
  it.each(["8.8.8.8", "1.1.1.1"])(
    "should get IPv4 address information (%s)",
    async (ip) => {
      const resp = await client.getIpInfo(ip);

      expect(resp.ip).toEqual(ip);

      // security field should be boolean
      for (const key of Object.keys(resp.security)) {
        expect(typeof (resp.security as any)[key]).toEqual("boolean");
      }

      // location field should be string or object
      for (const key of Object.keys(resp.location)) {
        const value = (resp.location as any)[key];
        if (key === "isInEuropeanUnion") {
          expect(typeof value).toEqual("boolean");
        } else if (["latitude", "longitude"].includes(key)) {
          expect(typeof value).toEqual("string");
        } else {
          if (value === null) {
            expect(value).toEqual(null);
          } else {
            expect(typeof value).toEqual("string");
          }
        }
      }

      // network field should be string
      for (const key of Object.keys(resp.network)) {
        expect(typeof (resp.network as any)[key]).toEqual("string");
      }
    },
  );

  it.each(["2001:4860:4860::8888"])(
    "should get IPv6 address information (%s)",
    async (ip) => {
      const resp = await client.getIpInfo(ip);

      expect(resp.ip).toEqual(ip);
    },
  );

  it.each(["invalid", "8.8.8.8.8", "2001:4860:4860::88888"])(
    "should throw an error for invalid IP address (%s",
    async (ip) => {
      await expect(client.getIpInfo(ip)).rejects.toThrow(
        `${ip} is not a valid IP address.`,
      );
    },
  );

  it.each(["10.0.0.1", "172.16.0.1", "192.168.0.1"])(
    "should throw an error for private IP address (%s)",
    async (ip) => {
      await expect(client.getIpInfo(ip)).rejects.toThrow(
        `${ip} is a private IP address.`,
      );
    },
  );

  it.each(["0.0.0.0", "::"])(
    "should throw an error for unspecified IP address (%s)",
    async (ip) => {
      await expect(client.getIpInfo(ip)).rejects.toThrow(
        `${ip} is a unspecified IP address.`,
      );
    },
  );

  it.each(["127.0.0.1", "::1"])(
    "should throw an error for loopback IP address (%s)",
    async (ip) => {
      await expect(client.getIpInfo(ip)).rejects.toThrow(
        `${ip} is a loopback IP address.`,
      );
    },
  );

  it.each(["169.254.0.1", "fe80::1"])(
    "should throw an error for link-local IP address (%s)",
    async (ip) => {
      await expect(client.getIpInfo(ip)).rejects.toThrow(
        `${ip} is a link-local IP address.`,
      );
    },
  );

  it.each(["224.0.0.1", "ff00::1"])(
    "should throw an error for multicast IP address (%s)",
    async (ip) => {
      await expect(client.getIpInfo(ip)).rejects.toThrow(
        `${ip} is a multicast IP address.`,
      );
    },
  );

  it("should throw an error for empty IP address (current IP)", async () => {
    await expect(client.getIpInfo("")).resolves.not.toThrow();
  });

  it("should throw an error for invalid API key", async () => {
    const client = new VpnApiClient("invalid");
    await expect(client.getIpInfo("8.8.8.8")).rejects.toThrow(
      "Request failed with status code 403",
    );
  });
});
