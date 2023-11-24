import OpenAI from "openai";

import { env } from "@sellgenix/env";

const openai = new OpenAI({
  apiKey: env.OPENAPI_KEY,
});

export async function querySmartDesk(message: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "ft:gpt-3.5-turbo-1106:personal:smartdesk:8MgOoRe5",
  });
  console.log(completion);

  return completion.choices[0];
}
