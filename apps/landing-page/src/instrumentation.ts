/* eslint-disable no-console */

import { env } from "./env";

export async function register() {
  if (env.NEXT_RUNTIME === "nodejs") {
    await import("next-cms/core/bootstrap");
  }
}
