# vpnapi-client

A Node.js client for the [VPNAPI.io](https://vpnapi.io/).

## Installing

### NPM

```bash
$ npm install vpnapi-client
```

### Yarn

```bash
$ yarn add vpnapi-client
```

## Usage

```javascript
import { VpnApiClient } from "vpnapi-client";

const key = "KEY";
const client = new VpnApiClient(key);

// Get IP information
(async () => {
  const resp = await client.getIpInfo("8.8.8.8");
  console.log(resp);
})();
```
