import { initContract } from "@ts-rest/core";
import { z } from "zod";

const contract = initContract();

const SubscribeBody = z
  .object({
    email: z
      .email()
      .trim()
      .toLowerCase()
      .max(254)
      .meta({
        description: "Email to subscribe",
        examples: ["user@example.com"],
      }),
  })
  .meta({ id: "SubscribeBody", description: "Newsletter subscription request" });

const MessageResponse = z
  .object({
    success: z.boolean().meta({ description: "Whether the request was accepted" }),
    message: z.string().meta({
      examples: ["If this email can be subscribed, a confirmation email is on its way."],
    }),
  })
  .meta({ id: "MessageResponse", description: "Result of the subscribe request" });

const subscribeContract = contract.router({
  subscribe: {
    description: "Subscribe an email to the newsletter",
    method: "POST",
    path: "/v1/newsletter/subscribe",
    summary: "Subscribe",
    body: SubscribeBody,
    responses: { 202: MessageResponse, 400: MessageResponse, 500: MessageResponse },
  },
});

export { SubscribeBody, MessageResponse, subscribeContract };
