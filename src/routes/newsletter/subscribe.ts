import type { z } from "zod";

import logger from "../../config/logger.js";
import type { MessageResponse, SubscribeBody } from "../../contracts/subscribe.contract.js";
import { upsertSubscriber } from "../../services/newsletter.js";
import type PubSubService from "../../services/pub-sub/types.js";

type SubscribeRequest = { body: z.infer<typeof SubscribeBody> };
type MessageBody = z.infer<typeof MessageResponse>;

type SubscribeResult = { status: 202; body: MessageBody } | { status: 500; body: MessageBody };

const subscribeRouter = (pubSub: PubSubService) => ({
  subscribe: async ({ body }: SubscribeRequest): Promise<SubscribeResult> => {
    try {
      const subscriber = await upsertSubscriber(body.email);

      if (subscriber !== null) {
        await pubSub.publish("newsletter-subscribe", {
          email: subscriber.email,
          token: subscriber.token,
        });
      }

      logger.info("Subscribe handler: request processed");

      return {
        status: 202,
        body: {
          success: true,
          message: "If this email can be subscribed, a confirmation email is on its way.",
        },
      };
    } catch (error) {
      logger.error(error);
      return { status: 500, body: { success: false, message: "Failed to subscribe" } };
    }
  },
});

export default subscribeRouter;
