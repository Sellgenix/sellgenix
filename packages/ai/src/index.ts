import OpenAI from "openai";

import { env } from "@sellgenix/env";

const openai = new OpenAI({
  apiKey: env.OPENAPI_KEY,
});

type Importance = "low" | "medium" | "high" | "urgent";

type EmailType =
  | "product_information_request"
  | "order_modification"
  | "order_delivery_address_correction"
  | "order_cancellation_request"
  | "order_return_request"
  | "order_status_request"
  | "order_tracking_request"
  | "order_delivery_issue"
  | "contact_information_correction";

interface GptResponse {
  type: EmailType;
  importance: Importance;
  summary: string;
  generated_response: string;
  sureness: number;
}

const SYSTEM_MESSAGE =
  "Please analyze the following customer support emails. Provide a JSON object in snake_case format with the following keys: 'type' for the precise request category, 'importance' for the urgency of the response needed (using 'low', 'medium', 'high', or 'urgent'), 'summary' for a brief English summary of the email content, 'generated_response' for a reply in the same language as the email, and 'sureness' as a decimal indicating the likelihood that the email is spam (where 1 is certainly spam).";

export async function querySmartDesk(
  message: string,
): Promise<GptResponse | undefined> {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_MESSAGE },
      { role: "user", content: message },
    ],
    model: "ft:gpt-3.5-turbo-1106:personal:smartdesk:8MgOoRe5",
    response_format: { type: "json_object" },
  });

  if (!completion.choices[0]?.message?.content) return undefined;

  const parsedMessage = JSON.parse(
    completion.choices[0].message.content,
  ) as GptResponse;

  return parsedMessage;
}
