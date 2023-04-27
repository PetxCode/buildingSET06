import { HTTP } from "./HTTP";

interface errorArgs {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}

export class mainAppErrorHandler extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly status: HTTP;
  public readonly success: boolean = true;

  constructor(args: errorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";

    this.status = args.status;

    if (this.success !== undefined) {
      this.success = args.success;
    }
  }
}
