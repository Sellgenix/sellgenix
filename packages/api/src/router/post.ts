import { analytics } from "@sellgenix/analytics";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  testAnalytics: protectedProcedure.mutation(({ ctx }) => {
    analytics.track("Analytics: Something happened", {
      distinctId: ctx.session.user.id,
      properties: undefined,
    });
  }),
});
