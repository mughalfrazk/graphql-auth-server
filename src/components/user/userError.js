export class UserError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "UserError";
  }
}
