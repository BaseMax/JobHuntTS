import { container } from "tsyringe";

container.register("jwt-secret", { useValue: process.env.SECRET });
container.register("jwt-expireTime", { useValue: 3600 * 24 });

function assertString(s: string | undefined): string {
  if (!s) {
    throw new Error("expected string");
  }
  return s;
}
export { container } from "tsyringe";
