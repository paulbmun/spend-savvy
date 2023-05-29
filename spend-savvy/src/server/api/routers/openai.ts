import { z } from "zod";
import { env } from "~/env.mjs";
import axios from "axios";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// add correct types (replace `any`)

export const openAIRouter = createTRPCRouter({
  getBudgetSuggestion: publicProcedure
    .input(z.object({ text: z.string()}))
    .query(async ({ input }): Promise<any> => {

      console.log(env.OPENAI_API_KEY, "KEY")
      try {
        const response = await axios.get(
            "https://api.openai.com/v1/models", 
          {
            headers: {
              Authorization: `Bearer ${env.OPENAI_API_KEY}`
            },
          })
        return response.data.data
      } catch (error) {
        throw error;
      }
    })
});