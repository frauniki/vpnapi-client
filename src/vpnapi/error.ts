export class VpnApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VpnApiError";
  }
}
