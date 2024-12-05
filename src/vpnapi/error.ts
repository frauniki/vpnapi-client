export class VpnApiError extends Error {
  constructor(message: string, error?: Error) {
    super(message);
    this.name = "VpnApiError";
    this.stack = error?.stack;
  }
}
