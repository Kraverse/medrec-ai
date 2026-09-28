import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { answerMedicalQuestion, demoRecord, medrecQueryInput } from "./medrec";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  medrec: router({
    demo: publicProcedure.query(() => demoRecord),
    ask: publicProcedure.input(medrecQueryInput).mutation(async ({ input }) => {
      return answerMedicalQuestion(input.question, input.record ?? demoRecord);
    }),
  }),
});

export type AppRouter = typeof appRouter;
