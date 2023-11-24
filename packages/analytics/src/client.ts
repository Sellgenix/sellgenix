import { PostHog } from "posthog-node";

import { env } from "@sellgenix/env";

import type { Events } from "./events";

const client = new PostHog(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
  flushAt: 1,
  flushInterval: 0,
  fetch: (...args) => fetch(...args),
});

export const analytics = {
  track<T extends keyof Events>(
    key: T,
    payload: {
      distinctId: string;
      properties: Events[T];
    },
  ) {
    client.capture({
      distinctId: payload.distinctId,
      event: key,
      properties: payload.properties,
    });
  },
};
