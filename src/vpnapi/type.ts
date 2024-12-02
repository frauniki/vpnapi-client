export interface VpnApiResponse {
  ip: string;
  security: Security;
  location: Location;
  network: Network;
}

export interface VpnApiErrorResponse {
  message: string;
}

export interface Security {
  vpn: boolean;
  proxy: boolean;
  tor: boolean;
  relay: boolean;
}

export interface Location {
  city: string | null;
  region: string | null;
  country: string | null;
  continent: string | null;
  regionCode: string | null;
  countryCode: string | null;
  continentCode: string | null;
  latitude: string;
  longitude: string;
  timeZone: string | null;
  localeCode: string | null;
  metroCode: string | null;
  isInEuropeanUnion: boolean;
}

export interface Network {
  network: string;
  autonomousSystemNumber: string;
  autonomousSystemOrganization: string;
}
