import OpenAI from "openai";

const openai = new OpenAI();

export async function querySmartDesk(message: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "ft:gpt-3.5-turbo-1106:personal:smartdesk:8MgOoRe5",
  });
  console.log(completion);

  return completion.choices[0];
}
