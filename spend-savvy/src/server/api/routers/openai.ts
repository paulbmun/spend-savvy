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
    .input(z.object({ text: z.string()}))
    .query(async ({ input }) => {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions", 
          {
            headers: {
              Authorization: "Bearer "
            },
            model: "text-davinci-003",
            prompt: input.text,
            max_tokens: 5,
            temperature: 0
          })
        return response.data.choices[0].text;
      } catch (error) {
        throw error;
      }
    })
});

