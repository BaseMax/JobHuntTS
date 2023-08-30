import { container } from "tsyringe";
import dotenv from "dotenv";
dotenv.config();

container.register("SECRET_KEY", {
  useValue: assertString(process.env.SECRET_KEY),
});
container.register("access-token-expireTime", { useValue: 3600 * 24 });
container.register("refresh-token-expireTime", { useValue: 3600 * 24 * 7 });

function assertString(s: string | undefined): string {
  if (!s) {
    throw new Error("expected string");
  }
  return s;
}
export { container } from "tsyringe";
