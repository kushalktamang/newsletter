import { initContract } from "@ts-rest/core";
import { z } from "zod";

const contract = initContract();

const SubscribeBody = z
  .object({
    email: z.email().meta({
      description: "Email to subscribe",
      examples: ["user@example.com"],
    }),
  })
  .meta({ id: "SubscribeBody", description: "Newsletter subscription request" });

const SubscribeResponse = z
  .object({
    email: z.email().meta({
      description: "The email address that was subscribed",
      examples: ["user@example.com"],
    }),
    subscribedAt: z.iso.datetime().meta({
      description: "When the subscription was created (ISO 8601, UTC)",
      examples: ["2026-10-16T09:30:00.000Z"],
    }),
  })
  .meta({
    id: "SubscribeResponse",
    description: "Subscription created",
  });

const ErrorResponse = z
  .object({ message: z.string().meta({ examples: ["Email is already subscribed"] }) })
  .meta({ id: "ErrorResponse", description: "Email is already subscribed" });

const subscribeContract = contract.router({
  subscribe: {
    description: "Subscribe an email to the newsletter",
    method: "POST",
    path: "/v1/newsletter/subscribe",
    summary: "Subscribe",
    body: SubscribeBody,
    responses: { 201: SubscribeResponse, 409: ErrorResponse },
  },
});

export { SubscribeBody, SubscribeResponse, ErrorResponse, subscribeContract };
