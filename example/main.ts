import { VpnApiClient } from "../src";

const key = process.env.VPNAPI_KEY ?? "";

const main = async () => {
  const client = new VpnApiClient(key);

  // Get IP information
  const resp = await client.getIpInfo("8.8.8.8");
  console.log(resp);
};

(async () => {
  await main();
})();
