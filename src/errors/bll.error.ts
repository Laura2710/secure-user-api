export class BLLError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
  ) {
    super(message);
    this.name = "BLLError";
    Object.setPrototypeOf(this, BLLError.prototype);
  }
}
