import { z } from "zod";
import { env } from "~/env.mjs";
import axios from "axios";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const openAIRouter = createTRPCRouter({
  getBudgetSuggestion: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      console.log(env.OPENAI_API_KEY, "KEY");
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            model: "text-davinci-003",
            prompt: input.text,
            max_tokens: 7,
            temperature: 0,
            top_p: 1,
            n: 1,
            stream: false,
            logprobs: null,
            stop: "\n",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            },
          }
        );
        return response.choices[0].text;
      } catch (error) {
        throw error;
      }
    }),
});