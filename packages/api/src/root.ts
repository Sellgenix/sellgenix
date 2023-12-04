import { aiRouter } from "./router/ai";
import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  ai: aiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
