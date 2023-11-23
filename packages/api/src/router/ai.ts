import { z } from "zod";

import { querySmartDesk } from "@sellgenix/ai";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const aiRouter = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(({ input }) => {
      return querySmartDesk(input.message);
    }),
});
